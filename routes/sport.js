const sportController = require("../controllers/sportController");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const { Sport, User, Genre } = require("../models");
const router = require("express").Router();

router.get("/", sportController.getSports);

router.post("/", sportController.createSport);

router.put("/:id", authorization, sportController.editSport);

router.patch("/:id", authorizationAdmin, sportController.editSportStatus);

router.delete("/:id", authorization, sportController.deleteSport);

module.exports = router;
