const projectController = require("../controllers/projectController");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const authentication = require("../middlewares/authentication");
const { Sport, User, Genre } = require("../models");
const router = require("express").Router();

router.get("/", projectController.getProjects);
router.patch("/:ProjectId", authentication, projectController.updateProject);

module.exports = router;
