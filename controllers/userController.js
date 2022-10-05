const { OAuth2Client } = require("google-auth-library");
const { Awardee } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class userController {
  static async changeIsSubscribe(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        throw { name: "InvalidUser" };
      }

      const updatedUser = await User.update(
        { isSubscribe: "Subscribed" },
        { where: { email: email } }
      );

      if (!updatedUser) {
        throw { name: "InvalidUser" };
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailRequired" };
      }
      if (!password) {
        next({ name: "PasswordRequired" });
      }
      const role = "Admin";
      const user = await User.create({ email, password, role });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async customerRegister(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        age,
        gender,
        weight,
        height,
        neck,
        waist,
        hip,
        activitylevel,
        goal,
      } = req.body;
      console.log("req body>>>", req.body);
      if (email === undefined || email === null) {
        throw { name: "EmailRequired" };
      }
      if (!password) {
        next({ name: "PasswordRequired" });
      }

      const user = await User.create({
        name,
        email,
        password,
        age,
        gender,
        weight,
        height,
        neck,
        waist,
        hip,
        activitylevel,
        goal,
      });
      // console.log(user);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        next({ name: "EmailRequired" });
      }

      if (!password) {
        next({ name: "PasswordRequired" });
      }

      const user = await Awardee.findOne({ where: { email: email } });

      if (user === null) {
        console.log("user null");

        throw { name: "Unauthorized" };
      } else if (!user) {
        next({ name: "Unauthorized" });
      } else if (!comparePassword(password, user.password)) {
        next({ name: "Unauthorized" });
      } else {
        console.log(user.dataValues, "<<<<<<<<<<<user userController login");
        const { firstName, lastName } = user.dataValues;
        let name = firstName + " " + lastName;
        console.log(name, "<<<<<<<name");

        // console.log(user.dataValues.id, user.dataValues.email);
        const access_token = signToken({
          id: user.dataValues.id,
          email: user.dataValues.email,
        });

        // console.log(access_token);

        res.status(200).json({
          access_token,
          name,
          email: user.email,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async customerLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email) {
        next({ name: "EmailRequired" });
      }

      if (!password) {
        next({ name: "PasswordRequired" });
      }

      const user = await User.findOne({ where: { email: email } });
      console.log(user);
      if (user === null) {
        console.log("user null");

        throw { name: "Unauthorized" };
      } else if (!user) {
        console.log("user negation");
        next({ name: "Unauthorized" });
      } else if (!comparePassword(password, user.password)) {
        console.log("compare password failed..");
        next({ name: "Unauthorized" });
      } else {
        console.log(user.dataValues, "<<<<<<<<<<<user userController login");
        const { firstName, lastName } = user.dataValues;
        let name = firstName + " " + lastName;
        console.log(name, "<<<<<<<name");
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });

        res.status(200).json({
          access_token,
          name,
          email: user.email,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  //gsi

  static async googleSignIn(req, res, next) {
    try {
      const { credential } = req.headers;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          name: payload.name,
          email: payload.email,
          password: "google_password",
          role: "Staff",
          phoneNumber: "02180675787",
          address: "Jl. Sultan Iskandar Muda No.7 Jakarta Selatan 12240",
          name: "Google User",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        access_token,
        email: payload.email,
        message: "Google sign in succeed",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async changeProjectPledged(req, res, next) {
    try {
      const { id } = req.params;
      const { id: AwardeeId } = req.user;

      const findProject = await Project.findByPk(id);

      if (!findProject) {
        throw { name: "NotFound" };
      }

      const updatedProject = await Project.update(
        { pledged: "Paid" },
        {
          where: {
            id,
          },
          order: [["id", "ASC"]],
        }
      );

      console.log(updatedMyBooking, "<<<<updated MyBooking");

      if (!updatedMyBooking) {
        throw { name: "NotFound" };
      }

      res.status(200).json({
        message: "My booking succesfully paid",
      });
    } catch (err) {
      next(err);
    }
  }

  static async customerGoogleSignIn(req, res, next) {
    try {
      const { credential } = req.headers;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          name: payload.name,
          email: payload.email,
          password: "google_password",
          role: "Customer",
          phoneNumber: "02180675787",
          address: "Jl. Sultan Iskandar Muda No.7 Jakarta Selatan 12240",
          name: "Google User Customer",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        access_token,
        email: payload.email,
        message: "Google sign in succeed",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = { userController };
