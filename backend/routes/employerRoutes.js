const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/auth')
const { favoriteController, getFavoriteCvController } = require('../controllers/employerController')

router.route('/cv/favorite').post(isAuthenticated, favoriteController)
router.route('/cv/all/favorite').get(isAuthenticated, getFavoriteCvController)

module.exports = router
