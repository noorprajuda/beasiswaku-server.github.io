const { Movie, User, Genre, History } = require("../models");
class historyController {
  static async getHistories(req, res, next) {
    try {
      const { id } = req.user;
      let histories = await History.findAll({
        include: [User],
        where: { UserId: id },
      });

      if (!histories) {
        next({ name: "NotFound" });
      } else {
        res.status(200).json({
          statusCode: 200,
          data: histories,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = historyController;
