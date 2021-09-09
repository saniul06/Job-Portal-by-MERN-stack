const router = require('express').Router();
const { body } = require('express-validator');
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

const {
    createCategoryController,
    getAllCategoriesController,
    deleteCategoryController,
    getSubcategoriesController,
    deleteSubCategoryController,
    getMaxVideoSizeController,
    setMaxVideoSizeController,
    sendEmailToEmployeeController,
    addInstagramVideoLinkController,
    deleteVideoController,
    approveOrDisapproveController,
    activateOrDeactivateController,
    deleteUserAndCv,
    getVerifiedUser,
    getUnverifiedUsers,
    registerAdminController
} = require('../controllers/adminController');

router.route('/get-categories').get(getAllCategoriesController);
router.route('/create-category').post(isAuthenticated, createCategoryController);
router.route('/delete-category').post(isAuthenticated, authorizeRoles('admin'), deleteCategoryController);
router.route('/delete-subcategory').post(isAuthenticated, authorizeRoles('admin'), deleteSubCategoryController);
router.route('/get-subcategories').get(getSubcategoriesController);
router.route('/get-max-video-size').get(isAuthenticated, authorizeRoles('admin'), getMaxVideoSizeController);
router.route('/set-max-video-size').post(isAuthenticated, authorizeRoles('admin'), setMaxVideoSizeController);

router.route('/send-email-to-employee').post(isAuthenticated, authorizeRoles('admin'), sendEmailToEmployeeController);
router.route('/cv/add-instagram-video-link').post(isAuthenticated, authorizeRoles('admin'), addInstagramVideoLinkController);
router.route('/cv/delete-video').post(isAuthenticated, authorizeRoles('admin'), deleteVideoController)
router.route('/cv/approve-or-disapprove').post(isAuthenticated, authorizeRoles('admin'), approveOrDisapproveController)
router.route('/cv/activate-or-deactivate').post(isAuthenticated, authorizeRoles('admin'), activateOrDeactivateController)
router.route('/delete-user-and-cv').post(isAuthenticated, authorizeRoles('admin'), deleteUserAndCv)
router.route('/user/verified').get(isAuthenticated, authorizeRoles('admin'), getVerifiedUser)
router.route('/user/unverified').get(isAuthenticated, authorizeRoles('admin'), getUnverifiedUsers)
router.route('/register/admin').post(body('email')
    .not()
    .isEmpty()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Invaid email address'), isAuthenticated, authorizeRoles('admin'),
    registerAdminController)

module.exports = router;
