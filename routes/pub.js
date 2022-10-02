const { userController } = require("../controllers/userController");
const authenticationCustomer = require("../middlewares/authenticationCustomer");
const historyController = require("../controllers/historyController");
const SportController = require("../controllers/sportController");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const { Movie, User, Genre, History } = require("../models");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/register", userController.customerRegister);
router.post("/login", userController.customerLogin);

router.post("/google-sign-in", userController.customerGoogleSignIn);

router.use(authentication);

router.get(
  "/fitness",

  SportController.customerGetFitness
);
router.get(
  "/movies/:id",

  SportController.customerGetSport
);

router.put(
  "/updateFitness",

  SportController.updateFitness
);

router.get("/histories", historyController.getHistories);

router.post(
  "/favorites/:movieId",
  authenticationCustomer,
  SportController.customerCreateTodo
);

module.exports = router;
