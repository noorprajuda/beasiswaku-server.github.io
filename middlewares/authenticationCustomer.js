const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authenticationCustomer = async (req, res, next) => {
  try {
    console.log("TRY AUTH CUSTOMER");
    const { access_token } = req.headers;
    console.log(access_token, "<<<<access_token");
    const decoded = verifyToken(access_token);
    console.log(decoded);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      next({ name: "Unauthorized" });
    } else {
      if (user.role !== "Customer") {
        next({ name: "Unauthorized" });
      } else {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };

        next();
      }
    }
  } catch (err) {
    console.log("ERR KEBEGAL AUTH CUSTOMER");
    next(err);
  }
};

module.exports = authenticationCustomer;
