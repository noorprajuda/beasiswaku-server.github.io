const router = require("express").Router();
const { donatorController } = require("../controllers/donatorController");
const authentication = require("../middlewares/authentication");

const sportRoutes = require("./sport");
const historyRoutes = require("./histories");
const paymentRoutes = require("./payment");
const projectRoutes = require("./projects");
const donatorRoutes = require("./donators");

router.use("/projects", projectRoutes);
router.use("/donators", donatorRoutes);

// router.post("/register", donatorController.register);
// router.post("/login", donatorController.login);

router.use(authentication);
router.use("/payment", paymentRoutes);
router.use("/sports", sportRoutes);
router.use("/histories", historyRoutes);

module.exports = router;
