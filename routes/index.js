const router = require("express").Router();
const { userController } = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const pubRoutes = require("./pub");
const sportRoutes = require("./sport");
const historyRoutes = require("./histories");
const paymentRoutes = require("./payment");
const projectRoutes = require("./projects");

router.use("/pub", pubRoutes);
router.use("/projects", projectRoutes);
router.use("/payment", paymentRoutes);
router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authentication);
router.use("/sports", sportRoutes);
router.use("/histories", historyRoutes);

module.exports = router;
