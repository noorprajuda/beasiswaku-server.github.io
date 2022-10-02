const projectController = require("../controllers/projectController");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const { Sport, User, Genre } = require("../models");
const router = require("express").Router();

router.get("/", projectController.getProjects);

module.exports = router;
