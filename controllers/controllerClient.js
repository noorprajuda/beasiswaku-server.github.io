"use strict";

const midtransClient = require("midtrans-client");

// let snap = new midtransClient.Snap({
//   isProduction: false,
//   serverKey: "SB-Mid-server-KwbMC2l_R8bDHB8ywGDpx_aG",
//   clientKey: "SB-Mid-client-FNQJSAVphK029Fk0",
// });

const {
  BoardingHouses,
  Bookmarks,
  BoardingHouseRules,
  BoardingHouseFacilities,
  Categories,
  City,
  Images,
  MyBooking,
  Rules,
  Facilities,
  Users,
  sequelize,
} = require("../models");
const { MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY } = process.env;
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_MAPS_API,
  Promise: Promise,
});

class ControllerClient {
  static async registerClient(req, res, next) {
    try {
      const { fullName, email, password, phoneNumber, address } = req.body;
      let input = {
        fullName,
        email,
        password,
        phoneNumber: "0" + phoneNumber,
        role: "Tenant",
        address,
      };
      console.log(input);

      const creteTenant = await Users.create(input);

      res.status(201).json({
        statuscode: 201,
        message: "User has been created",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async boardingHouses(req, res, next) {
    try {
      const { city } = req.query;

      const options = {
        include: [
          { model: Categories, attributes: ["name"] },
          { model: City, attributes: ["name"] },
          {
            model: Users,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };
      //ini di test
      if (city) {
        options.where = {
          CityId: city,
        };
      }

      let kos = await BoardingHouses.findAll(options);
      //loop , await id, detail

      for (let i = 0; i < kos.length; i++) {
        let getQty = await MyBooking.findAll({
          where: { BoardingHouseId: kos[i].id, status: "Paid" },
        });
        if (getQty.length) {
          kos[i].totalRoom = kos[i].totalRoom - getQty.length;
        }
      }

      res.status(200).json(kos);
    } catch (err) {
      next(err);
    }
  }

  static async bourdingHousesId(req, res, next) {
    try {
      const { id } = req.params;

      const idBourdingHousesId = await BoardingHouses.findByPk(id, {
        include: [
          { model: Categories, attributes: ["name"] },
          { model: City, attributes: ["name"] },
          {
            model: Users,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          { model: Images, attributes: ["imgUrl"] },
          {
            model: BoardingHouseFacilities,
            include: [{ model: Facilities, attributes: ["name"] }],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: BoardingHouseRules,
            include: [{ model: Rules, attributes: ["name"] }],
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // const facility = await BoardingHouseFacilities.findAll({
      //   where: { BoardingHouseId: id },
      //   include: { model: Facilities, attributes: ["name"] },
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
      // });

      // const rull = await BoardingHouseRules.findAll({
      //   where: { BoardingHouseId: id },
      //   include: { model: Rules, attributes: ["name"] },
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
      // });
      const houseTenant = await MyBooking.findAll({
        where: { BoardingHouseId: idBourdingHousesId.id, status: "Paid" },
      });

      if (houseTenant.length) {
        idBourdingHousesId.totalRoom =
          idBourdingHousesId.totalRoom - houseTenant.length;
      }

      res.status(200).json(idBourdingHousesId);
    } catch (err) {
      next(err);
    }
  }

  static async myBookmark(req, res, next) {
    try {
      const { id } = req.user;
      const myBookmark = await Bookmarks.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: BoardingHouses,
          include: [
            { model: Categories, attributes: ["name"] },
            { model: City, attributes: ["name"] },
            {
              model: Users,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            { model: Images, attributes: ["imgUrl"] },
            {
              model: BoardingHouseFacilities,
              include: [{ model: Facilities, attributes: ["name"] }],
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: BoardingHouseRules,
              include: [{ model: Rules, attributes: ["name"] }],
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      for (let i = 0; i < myBookmark.length; i++) {
        let getQty = await MyBooking.findAll({
          where: {
            BoardingHouseId: myBookmark[i].BoardingHouse.id,
            status: "Paid",
          },
        });
        if (getQty.length) {
          myBookmark[i].BoardingHouse.totalRoom =
            myBookmark[i].BoardingHouse.totalRoom - getQty.length;
        }
      }
      res.status(200).json(myBookmark);
    } catch (err) {
      next(err);
    }
  }

  static async myBookings(req, res, next) {
    try {
      const { id } = req.user;
      const myBookings = await MyBooking.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: BoardingHouses,
          include: [
            { model: Categories, attributes: ["name"] },
            { model: City, attributes: ["name"] },
            {
              model: Users,
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            { model: Images, attributes: ["imgUrl"] },
            {
              model: BoardingHouseFacilities,
              include: [{ model: Facilities, attributes: ["name"] }],
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: BoardingHouseRules,
              include: [{ model: Rules, attributes: ["name"] }],
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      res.status(200).json(myBookings);
    } catch (err) {
      next(err);
    }
  }

  static async createMyBooking(req, res, next) {
    try {
      const { id } = req.params;
      const { BoardingHouseId, startDate } = req.body;
      const { id: UserId } = req.user;

      // console.log(req.body, "<<<<<<<<<<<<<<<<<<<<<<<req body");

      // console.log(startDate, "<<<<<<<<<<<<<<<startDate");

      const findBoardingHouse = await BoardingHouses.findByPk(id);

      if (!findBoardingHouse) {
        throw { name: "NotFound" };
      }
      // ini ditest
      let input = {
        UserId: UserId,
        BoardingHouseId: BoardingHouseId,
        startDate: startDate,
        status: "Unpaid",
      };

      const createMyBooking = await MyBooking.create(input);
      res.status(201).json({ message: "Succesfully add data to My Bookings" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;

      const findBoardingHouse = await BoardingHouses.findByPk(id);

      if (!findBoardingHouse) {
        throw { name: "NotFound" };
      }

      let input = {
        UserId: UserId,
        BoardingHouseId: id,
      };

      const findBookmark = await Bookmarks.findOne({
        where: { UserId: UserId, BoardingHouseId: id },
      });
      if (findBookmark) throw { name: "double" };

      await Bookmarks.create(input);
      res.status(201).json({ message: "Succesfully add bookmark" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, "<<<<<");

      const findBookmark = await Bookmarks.findByPk(id);

      if (!findBookmark) {
        throw { name: "NotFound" };
      }

      await Bookmarks.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Bookmark succesfully delete",
      });
    } catch (err) {
      console.log(err, "<<<<<<<<<<<<<<<<<<<<data error");
      next(err);
    }
  }

  static async changeMyBookingStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { id: UserId } = req.user;

      const findMyBooking = await MyBooking.findByPk(id);

      if (!findMyBooking) {
        throw { name: "NotFound" };
      }

      const updatedMyBooking = await MyBooking.update(
        { status: "Paid" },
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

  static async deleteMyBooking(req, res, next) {
    try {
      const { id } = req.params;

      const findMyBooking = await MyBooking.findByPk(id);

      if (!findMyBooking) {
        throw { name: "NotFound" };
      }

      await MyBooking.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "My Booking succesfully delete",
      });
    } catch (err) {
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { amount } = req.body;

      console.log(req.body, "<<<<<req body");

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: Math.floor(Math.random() * 10000000000000),
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      console.log(transactionToken, "<<<<<transactionToken");

      res.status(201).json({
        statusCode: 201,
        token: transactionToken,
      });
    } catch (err) {
      next(err);
    }
  }

  static async searchHandler(req, res, next) {
    try {
      const { address } = req.query;

      console.log(address, "<<<address");
      const response = await googleMapsClient
        .geocode({
          address: address,
        })
        .asPromise();
      console.log(response);
      if (!response.json.results.length) throw { name: "invalidAddress" };
      let jsn = response.json.results;
      let latlong = "";
      for (let i = 0; i < jsn.length; i++) {
        let res = jsn[i];
        latlong += res.geometry.location.lat + " " + res.geometry.location.lng;
      }
      const long = latlong.split(" ")[1];
      const lat = latlong.split(" ")[0];
      const distance = 3000;
      const result = await sequelize.query(
        `SELECT b.id ,b."name" ,b.price ,c.name AS "Category",b."location" ,b."mainImg" 
        ,b.address 
             ,c2."name" AS cities , b."description"
            FROM "BoardingHouses" b 
            JOIN "Categories" c ON c.id = b."CategoryId" 
            JOIN "Cities" c2 ON c2.id = b."CityId" 
            where
            ST_DWithin(location,
            ST_MakePoint(:lat,
            :long),
            :distance,
            true) = true;
            `,
        {
          replacements: {
            distance: +distance,
            long: parseFloat(long),
            lat: parseFloat(lat),
          },
          logging: console.log,
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.SELECT,
        }
      );
      result.forEach((el) => {
        el.Category = {
          name: el.Category,
        };
      });
      const boardingHouses = {
        id: result.id,
      };
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerClient;
