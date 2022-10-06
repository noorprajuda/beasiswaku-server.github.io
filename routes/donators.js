const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const { donatorController } = require("../controllers/donatorController");

router.post("/register", donatorController.register);
router.post("/login", donatorController.login);

module.exports = router;
