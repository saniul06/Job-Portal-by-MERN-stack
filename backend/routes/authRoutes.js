const router = require('express').Router();
const { body } = require('express-validator');
const employeeRegisterValidator = require('../utils/employeeRegisterValidator')
const employerRegisterValidator = require('../utils/employerRegisterValidator')
const cvUpdateValidator = require('../utils/cvUpdateValidator')

const {
    getCategoriesAndSubCategories,
    registerEmployeeController,
    registerEmployerController,
    login,
    verifyEmailController,
    getSingleUser,
    resendVerificationEmail,
    loadUser,
    loadEmployee,
    logout,
    getUserByEmail,
    resetPassword,
    updateProfile,
    updateCv,
    updatePassword
} = require('../controllers/authControllers');

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');


router.route('/categoriesAndSubCategories').get(getCategoriesAndSubCategories);

router.route('/register/employee').post(employeeRegisterValidator, registerEmployeeController);

router.route('/register/employer').post(employerRegisterValidator, registerEmployerController);

router.route('/login/user').post(login)

router.route('/logout').get(logout)

router.route('/verify/email').post(verifyEmailController)

router.route('/user/get/:id').get(getSingleUser)

router.route('/load/user').get(isAuthenticated, loadUser)

router.route('/load/employee/:id').get(loadEmployee)

router.route('/resend/email').post(resendVerificationEmail)

router.route('/user/email').post(getUserByEmail)

router.route('/reset/password').post(resetPassword)

router.route('/profile/update').post(
    isAuthenticated,
    authorizeRoles('employee', 'admin'),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please provide an email')
        .isEmail()
        .withMessage('Invaid email address'),
    updateProfile
);

router.route('/cv/update').post(isAuthenticated, authorizeRoles('employee', 'admin'), cvUpdateValidator, updateCv)

router.route('/password/update').post(isAuthenticated, authorizeRoles('employee', 'admin', 'employer'), updatePassword)

module.exports = router;
