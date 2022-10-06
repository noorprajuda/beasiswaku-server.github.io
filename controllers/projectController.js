const {
  Project,
  ProjectDonator,
  ProjectStatus,
  Institution,
  Sport,
  Awardee,
  Genre,
  History,
  Todo,
} = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");

const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: sports } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, sports, totalPages, currentPage };
};

class projectController {
  static async updateProject(req, res, next) {
    try {
      // console.log("updateProject");
      console.log("req>>>>>>>>>>", req.user);
      const { id: DonatorId } = req.user;
      console.log("DonatorId>>", DonatorId);
      const { ProjectId } = req.params;
      const { amount } = req.body;

      console.log("req Body>>>>", req.body);

      const project = await Project.findOne({ where: { id: ProjectId } });

      console.log("project.pledged>>>>>", project.pledged);
      console.log("amount>>>>>", amount);

      let totalPledged = Number(project.pledged) + Number(amount);
      console.log(totalPledged);

      const updatedProject = await Project.update(
        {
          pledged: totalPledged,
          investors: project.investors + 1,
        },
        { where: { id: ProjectId } }
      );

      console.log("updatedProject>>>>", updatedProject);

      if (updatedProject <= 0) {
        next({ name: "InvalidProject" });
      } else {
        const createHistory = await ProjectDonator.create({
          ProjectId,
          DonatorId,
          donationAmount: Number(amount),
        });

        res.status(200).json({
          message: `Project pledged success to update`,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async createProject(req, res, next) {
    try {
      const { id } = req.Project;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;

      const createSport = await Sport.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: id,
      });

      if (!createSport) {
        next({ name: "NotFound" });
      }

      const createHistory = await History.create({
        SportId: createSport.id,
        title: title,
        description: `New Sport with id ${createSport.id} created`,
        updatedBy: id,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Sport ${title} created successfully`,
        data: createSport,
      });
    } catch (err) {
      next(err);
    }
  }

  static async customerCreateTodo(req, res, next) {
    try {
      console.log("controller createTodo");
      const { id } = req.user; //authorId - UserId
      const { SportId } = req.params;

      const Sport = await Sport.findOne({
        where: {
          id: SportId,
        },
      });

      if (!Sport) {
        next({ name: "SportNotFound" });
      }

      const createTodo = await Todo.create({
        authorId: id,
        SportId: SportId,
      });

      if (!createTodo) {
        next({ name: "NotFound" });
      } else {
        const todoSport = await Sport.findOne({
          where: {
            id: SportId,
          },
        });
        res.status(201).json({
          statusCode: 201,
          message: `Sport '${todoSport.title}' added successfully to Todos`,
          data: createTodo,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getProjects(req, res, next) {
    try {
      let projects = await Project.findAll({
        include: ["Awardee", "ProjectStatus", "Institution"],
      });

      if (projects.length === 0) {
        throw { name: "SportNotFound" };
      } else {
        // await Project.update(
        //   {
        //     investors: await ProjectDonator.count({
        //       where: {
        //         ProjectId: Project.id,
        //         donationAmount: { [Op.gt]: 0 },
        //       },
        //     }),
        //   },
        //   { where: { id: Project.id } }
        // );

        projects.map(async (project) => {
          // await Project.update(
          //   {
          //     investors: await ProjectDonator.count({
          //       where: {
          //         ProjectId: project.id,
          //         donationAmount: { [Op.gt]: 0 },
          //       },
          //     }),
          //   },
          //   { where: { id: project.id } }
          // );

          // .then((data) => {
          //   data = newInvestors;
          // project.dataValues.newInvestors = newInvestors;
          // })
          // .catch((err) => {
          //   console.log(err);
          // });

          // console.log(project.dataValues.investors);

          project.dataValues.pledgedPercentage =
            (Number(project.pledged) * 100) / Number(project.goal);
        });

        // console.log("projects>>>>", projects);

        // const investors = await ProjectDonator.count({
        //   where: {
        //     ProjectId: 1,
        //     donationAmount: { [Op.gt]: 0 },
        //   },
        // });

        // console.log("jumlah investors>>>", investors);

        res.status(200).json({
          statusCode: 200,
          data: projects,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async customerGetTodo(req, res, next) {
    try {
      console.log("GET TODO");
      const id = req.user.id; //id user bukan id Sport
      console.log(req.user);
      let todo = await Todo.findAll({
        where: { authorId: id },
        include: [{ model: Sport, include: [User, Genre] }],
      });

      if (todo.length === 0) {
        throw { name: "SportNotFound" };
      } else {
        res.status(200).json({
          statusCode: 200,
          data: todo,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async customerGetFitness(req, res, next) {
    try {
      console.log("GET Fitness");
      console.log(req.user);
      const id = req.user.id; //id user bukan id Sport

      let findUser = await User.findByPk(id);

      console.log("findUser>>>", findUser);

      if (!findUser) throw { name: "InvalidUser" };

      let data = {};

      const options = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/bmi",
        params: {
          age: findUser.age,
          weight: findUser.weight,
          height: findUser.height,
        },
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          console.log("response>>>", response);
          data.bmi = response.data;
        })
        .catch(function (error) {
          console.error("error>>>", error);
        });

      const options2 = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/idealweight",
        params: { gender: findUser.gender, height: findUser.height },
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      await axios
        .request(options2)
        .then(function (response) {
          // console.log(response.data);
          data.idealWeight = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      const options3 = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/bodyfat",
        params: {
          age: findUser.age,
          gender: findUser.gender,
          weight: findUser.weight,
          height: findUser.height,
          neck: findUser.neck,
          waist: findUser.waist,
          hip: findUser.hip,
        },
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      await axios
        .request(options3)
        .then(function (response) {
          // console.log(response.data);
          data.bodyFatPercentage = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      console.log("data>>>>", data);

      res.status(200).json({ data: data });
    } catch (err) {
      console.log("err>>>>>", err);
      next(err);
    }
  }

  static async getSports(req, res, next) {
    try {
      let sports = [];

      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };

      let temp = [];
      await axios
        .request(options)
        .then(function (response) {
          sports = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      //Pagination

      const { page, size } = req.query;

      if (page && size) {
        const { limit, offset } = getPagination(page, size);

        if (!sports) {
          next({ name: "NotFound" });
        } else {
          const result = getPagingData(sports, page, limit);

          res.status(200).json({
            statusCode: 200,
            data: result,
          });
        }
      } else {
        res.status(200).json({
          statusCode: 200,
          data: sports,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async customerGetSport(req, res, next) {
    try {
      console.log("MASUP");
      const id = req.params.id;
      let Sport = await Sport.findAll({
        where: { id: id },
        include: [User, Genre],
      });

      console.log(Sport);

      if (Sport.length === 0) {
        throw { name: "SportNotFound" };
      } else {
        res.status(200).json({
          statusCode: 200,
          data: Sport,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async editSport(req, res, next) {
    try {
      const authorId = req.user.id;
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,

        status,
      } = req.body;
      const { id } = req.params;
      const updatedSport = await Sport.update(
        {
          title: title,
          synopsis: synopsis,
          trailerUrl: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
          authorId: authorId,
          status: status,
        },
        { where: { id: id } }
      );

      if (updatedSport <= 0) {
        next({ name: "NotFound" });
      } else {
        const createHistory = await History.create({
          SportId: id,
          title: title,
          description: `Sport with id ${id} updated`,
          updatedBy: authorId,
        });

        res.status(200).json({
          message: `Sport ${id} success to update`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editSportStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { id } = req.params;

      const beforeUpdatedSport = await Sport.findByPk(id);

      const statusBefore = beforeUpdatedSport.status;

      const updatedSport = await Sport.update(
        { status: status },
        { where: { id: id } }
      );

      if (updatedSport <= 0) {
        next({ name: "NotFound" });
      } else {
        await History.create({
          SportId: id,
          title: beforeUpdatedSport.title,
          description: `Sport with id ${id} status has been updated from ${statusBefore} to ${status}`,
          updatedBy: `${beforeUpdatedSport.authorId}`,
        });

        res.status(200).json({
          message: `Sport ${id} success to update`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteSport(req, res, next) {
    try {
      const { id } = req.params;
      const deletedSport = await Sport.destroy({ where: { id: id } });

      if (deletedSport <= 0) {
        next({ name: "NotFound" });
      } else {
        res.status(200).json({
          message: `Sport ${id} success to delete`,
        });
      }
      // res.status(200).json({
      //   message: `Please change Sport's status instead of hard delete`,
      // })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = projectController;
