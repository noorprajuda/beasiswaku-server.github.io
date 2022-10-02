const historyController = require('../controllers/historyController')
const authorization = require('../middlewares/authorization')
const authorizationAdmin = require('../middlewares/authorizationAdmin')
const { Movie, User, Genre, History } = require('../models')
const router = require('express').Router()

router.get('/', historyController.getHistories)

module.exports = router
