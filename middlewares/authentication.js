const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    console.log("access_token AUTH >>>", access_token);
    const decoded = verifyToken(access_token);

    console.log("decoded >>>", decoded);

    console.log("decoded email >>>", decoded.email);

    const user = await User.findOne({ where: { email: decoded.email } });

    console.log("user>>>", user);

    if (!user) {
      next({ name: "Unauthorized" });
    } else {
      console.log("ELSE AUTHENTICATION SUCCESS USER & REQ USER");
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
