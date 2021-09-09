const router = require('express').Router()

const { isAuthenticated } = require('../middlewares/auth')
const {
    getAllCvsController,
    getSingleCvController

} = require('../controllers/publicController');

router.route('/cv/all').get(getAllCvsController);
router.route('/cv/:cvId').get(getSingleCvController)

module.exports = router