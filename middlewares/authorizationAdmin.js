const { Movie } = require("../models");

const authorizationAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      next({ name: "NotFound" });
    } else {
      if (req.user.role === "Staff") {
        next({ name: "Forbidden" });
      } else if (req.user.role === "Admin") {
        next();
      } else {
        next({ name: "Forbidden" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorizationAdmin;
