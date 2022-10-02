const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "InvalidUser":
    case "Unauthorized":
      res.status(401).json({
        message: "Invalid email/password",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid token",
      });
      break;
    case "Forbidden":
      res.status(403).json({
        message: "You are not authorized",
      });
      break;
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "MovieNotFound":
      res.status(404).json({ message: "Movie not found" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Data not found" });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "E-mail is required!" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Password is required!" });
      break;
    case "RegisteredAsAdminOrStaff":
      res
        .status(400)
        .json({ message: "E-mail has been registered as Admin or Staff!" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
