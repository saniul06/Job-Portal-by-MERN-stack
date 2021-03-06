// =====================      Auth action types START    =========================

// load logged in user
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_UPDATE = 'LOAD_USER_UPDATE'
export const CV_UPDATE = 'CV_UPDATE'
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL'

//get verified user
export const VERIFIED_USER_REQUEST = 'VERIFIED_USER_REQUEST'
export const VERIFIED_USER_SUCCESS = 'VERIFIED_USER_SUCCESS'
export const VERIFIED_USER_FAIL = 'VERIFIED_USER_FAIL'
export const VERIFIED_USER_RESET = 'VERIFIED_USER_RESET'

//get unverified user
export const UNVERIFIED_USER_REQUEST = 'UNVERIFIED_USER_REQUEST'
export const UNVERIFIED_USER_SUCCESS = 'UNVERIFIED_USER_SUCCESS'
export const UNVERIFIED_USER_FAIL = 'UNVERIFIED_USER_FAIL'
export const UNVERIFIED_USER_RESET = 'UNVERIFIED_USER_RESET'

// login 
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const AUTH_RESET = 'AUTH_RESET'

// logout 
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const LOGOUT_RESET = 'LOGOUT_RESET'

// create new category
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST'
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS'
export const CREATE_CATEGORY_FAIL = 'CREATE_CATEGORY_FAIL'
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY'

// Delete category
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL'
export const DELETE_CATEGORY_RESET = 'DELETE_CATEGORY_RESET'

// Delete subcategory
export const DELETE_SUBCATEGORY_REQUEST = 'DELETE_SUBCATEGORY_REQUEST'
export const DELETE_SUBCATEGORY_SUCCESS = 'DELETE_CSUBATEGORY_SUCCESS'
export const DELETE_SUBCATEGORY_FAIL = 'DELETE_SUBCATEGORY_FAIL'
export const DELETE_SUBCATEGORY_RESET = 'DELETE_SUBCATEGORY_RESET'

// get categories
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL'
export const CLEAR_GET_CATEGORIES = 'CLEAR_GET_CATEGORIES'

// get sub categories
export const GET_SUBCATEGORIES_SUCCESS = 'GET_SUBCATEGORIES_SUCCESS'
export const GET_SUBCATEGORIES_FAIL = 'GET_SUBCATEGORIES_FAIL'
export const CLEAR_GET_SUBCATEGORIES = 'CLEAR_GET_SUBCATEGORIES'

// get all categories and sub-categories
export const ALL_CATEGORIES_SUCCESS = 'ALL_CATEGORIES_SUCCESS'
export const ALL_CATEGORIES_FAIL = 'ALL_CATEGORIES_FAIL'

// register employee
export const REGISTER_EMPLOYEE_REQUEST = 'REGISTER_EMPLOYEE_REQUEST'
export const REGISTER_EMPLOYEE_SUCCESS = 'REGISTER_EMPLOYEE_SUCCESS'
export const REGISTER_EMPLOYEE_FAIL = 'REGISTER_EMPLOYEE_FAIL'
export const REGISTER_EMPLOYEE_RESET = 'REGISTER_EMPLOYEE_RESET'

// register employer
export const REGISTER_EMPLOYER_REQUEST = 'REGISTER_EMPLOYER_REQUEST'
export const REGISTER_EMPLOYER_SUCCESS = 'REGISTER_EMPLOYER_SUCCESS'
export const REGISTER_EMPLOYER_FAIL = 'REGISTER_EMPLOYER_FAIL'
export const REGISTER_EMPLOYER_RESET = 'REGISTER_EMPLOYER_RESET'

// register admin
export const REGISTER_ADMIN_REQUEST = 'REGISTER_ADMIN_REQUEST'
export const REGISTER_ADMIN_SUCCESS = 'REGISTER_ADMIN_SUCCESS'
export const REGISTER_ADMIN_FAIL = 'REGISTER_ADMIN_FAIL'
export const REGISTER_ADMIN_RESET = 'REGISTER_ADMIN_RESET'

// email confirmation
export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST'
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS'
export const VERIFY_EMAIL_FAIL = 'VERIFY_EMAIL_FAIL'
export const VERIFY_EMAIL_RESET = 'VERIFY_EMAIL_RESET'

// load user 
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

// send verification email 
export const RESEND_VERIFY_EMAIL_REQUEST = 'RESEND_VERIFY_EMAIL_REQUEST'
export const RESEND_VERIFY_EMAIL_SUCCESS = 'RESEND_VERIFY_EMAIL_SUCCESS'
export const RESEND_VERIFY_EMAIL_FAIL = 'RESEND_VERIFY_EMAIL_FAIL'
export const RESEND_VERIFY_EMAIL_RESET = 'RESEND_VERIFY_EMAIL_RESET'

// get user by email
export const GET_USER_BY_EMAIL_REQUEST = 'GET_USER_BY_EMAIL_REQUEST'
export const GET_USER_BY_EMAIL_SUCCESS = 'GET_USER_BY_EMAIL_SUCCESS'
export const GET_USER_BY_EMAIL_FAIL = 'GET_USER_BY_EMAIL_FAIL'
export const GET_USER_BY_EMAIL_RESET = 'GET_USER_BY_EMAIL_RESET'

// get user by email
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL'
export const RESET_PASSWORD_RESET = 'RESET_PASSWORD_RESET'

// show avatar preview
export const SHOW_AVATAR_PREVIEW_SUCCESS = 'SHOW_AVATAR_PREVIEW_SUCCESS'

// update employee profile
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL'
export const UPDATE_PROFILE_RESET = 'UPDATE_PROFILE_RESET'

// update employee profile
export const UPDATE_CV_REQUEST = 'UPDATE_CV_REQUEST'
export const UPDATE_CV_SUCCESS = 'UPDATE_CV_SUCCESS'
export const UPDATE_CV_FAIL = 'UPDATE_CV_FAIL'
export const UPDATE_CV_RESET = 'UPDATE_CV_RESET'

// update password
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST'
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS'
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL'
export const UPDATE_PASSWORD_RESET = 'UPDATE_PASSWORD_RESET'

// load employee
export const LOAD_EMPLOYEE_REQUEST = 'LOAD_EMPLOYEE_REQUEST'
export const LOAD_EMPLOYEE_SUCCESS = 'LOAD_EMPLOYEE_SUCCESS'
export const LOAD_EMPLOYEE_FAIL = 'LOAD_EMPLOYEE_FAIL'
export const LOAD_EMPLOYEE_RESET = 'LOAD_EMPLOYEE_RESET'


// GET maximum size of video file
export const GET_VIDEO_SIZE_SUCCESS = 'GET_VIDEO_SIZE_SUCCESS'
export const GET_VIDEO_SIZE_FAIL = 'GET_VIDEO_SIZE_FAIL'
export const GET_VIDEO_SIZE_RESET = 'GET_VIDEO_SIZE_RESET'

// set maximum size of video file
export const SET_VIDEO_SIZE_SUCCESS = 'SET_VIDEO_SIZE_SUCCESS'
export const SET_VIDEO_SIZE_FAIL = 'SET_VIDEO_SIZE_FAIL'
export const SET_VIDEO_SIZE_RESET = 'SET_VIDEO_SIZE_RESET'

// get all cv's
export const ALL_CV_REQUEST = 'ALL_CV_REQUEST'
export const ALL_CV_SUCCESS = 'ALL_CV_SUCCESS'
export const ALL_CV_FAIL = 'ALL_CV_FAIL'
export const ALL_CV_RESET = 'ALL_RESETEST'

// get single cv
export const SINGLE_CV_REQUEST = 'SINGLE_CV_REQUEST'
export const SINGLE_CV_SUCCESS = 'SINGLE_CV_SUCCESS'
export const SINGLE_CV_FAIL = 'SINGLE_CV_FAIL'
export const SINGLE_CV_RESET = 'SINGLE_RESETEST'

// get all active cv's
export const ALL_ACTIVE_CV_REQUEST = 'ALL_ACTIVE_CV_REQUEST'
export const ALL_ACTIVE_CV_SUCCESS = 'ALL_ACTIVE_CV_SUCCESS'
export const ALL_ACTIVE_CV_FAIL = 'ALL_ACTIVE_CV_FAIL'
export const ALL_ACTIVE_CV_RESET = 'ALL_ACTIVE_RESETEST'

// send emial to employee
export const SEND_EMAIL_TO_EMPLOYEE_REQUEST = 'SEND_EMAIL_TO_EMPLOYEE_REQUEST'
export const SEND_EMAIL_TO_EMPLOYEE_SUCCESS = 'SEND_EMAIL_TO_EMPLOYEE_SUCCESS'
export const SEND_EMAIL_TO_EMPLOYEE_FAIL = 'SEND_EMAIL_TO_EMPLOYEE_FAIL'
export const SEND_EMAIL_TO_EMPLOYEE_RESET = 'SEND_EMAIL_TO_EMPLOYEE_RESET'

// send emial to employee
export const ADD_INSTAGRAM_VIDEO_LINK_REQUEST = 'ADD_INSTAGRAM_VIDEO_LINK_REQUEST'
export const ADD_INSTAGRAM_VIDEO_LINK_SUCCESS = 'ADD_INSTAGRAM_VIDEO_LINK_SUCCESS'
export const ADD_INSTAGRAM_VIDEO_LINK_FAIL = 'ADD_INSTAGRAM_VIDEO_LINK_FAIL'
export const ADD_INSTAGRAM_VIDEO_LINK_RESET = 'ADD_INSTAGRAM_VIDEO_LINESETEST'

// delete video
export const VIDEO_DELETE_REQUEST = 'VIDEO_DELETE_REQUEST'
export const VIDEO_DELETE_SUCCESS = 'VIDEO_DELETE_SUCCESS'
export const VIDEO_DELETE_FAIL = 'VIDEO_DELETE_FAIL'
export const VIDEO_DELETE_RESET = 'VIDEO_DELERESETEST'

// activate or deactivate cv
export const ACTIVATE_OR_DEACTIVATE_REQUEST = 'ACTIVATE_OR_DEACTIVATE_REQUEST'
export const ACTIVATE_OR_DEACTIVATE_SUCCESS = 'ACTIVATE_OR_DEACTIVATE_SUCCESS'
export const ACTIVATE_OR_DEACTIVATE_FAIL = 'ACTIVATE_OR_DEACTIVATE_FAIL'
export const ACTIVATE_OR_DEACTIVATE_RESET = 'ACTIVATE_OR_DEACTIVATE_RESET'

// approve or disapprove cv
export const APPROVE_OR_DISAPPROVE_REQUEST = 'APPROVE_OR_DISAPPROVE_REQUEST'
export const APPROVE_OR_DISAPPROVE_SUCCESS = 'APPROVE_OR_DISAPPROVE_SUCCESS'
export const APPROVE_OR_DISAPPROVE_FAIL = 'APPROVE_OR_DISAPPROVE_FAIL'
export const APPROVE_OR_DISAPPROVE_RESET = 'APPROVE_OR_DISAPPROVE_RESET'

// delete cv and employee
export const DELETE_CV_AND_EMPLOYEE_REQUEST = 'DELETE_CV_AND_EMPLOYEE_REQUEST'
export const DELETE_CV_AND_EMPLOYEE_SUCCESS = 'DELETE_CV_AND_EMPLOYEE_SUCCESS'
export const DELETE_CV_AND_EMPLOYEE_FAIL = 'DELETE_CV_AND_EMPLOYEE_FAIL'
export const DELETE_CV_AND_EMPLOYEE_RESET = 'DELETE_CV_AND_EMPLOYRESETEST'

// favorite or unfavorite cv
export const FAVORITE_OR_UNFAVORITE_CV_REQUEST = 'FAVORITE_OR_UNFAVORITE_CV_REQUEST'
export const FAVORITE_OR_UNFAVORITE_CV_SUCCESS = 'FAVORITE_OR_UNFAVORITE_CV_SUCCESS'
export const FAVORITE_OR_UNFAVORITE_CV_FAIL = 'FAVORITE_OR_UNFAVORITE_CV_FAIL'
export const FAVORITE_OR_UNFAVORITE_CV_RESET = 'FAVORITE_OR_UNFAVORITE_CVSETEST'

// get all favorite  cv
export const ALL_FAVORITE_CV_REQUEST = 'ALL_FAVORITE_CV_REQUEST'
export const ALL_FAVORITE_CV_SUCCESS = 'ALL_FAVORITE_CV_SUCCESS'
export const ALL_FAVORITE_CV_FAIL = 'ALL_FAVORITE_CV_FAIL'
export const ALL_FAVORITE_CV_RESET = 'ALL_FAVORITE_CVSETEST'



// =====================      Auth action types END    =========================


// =====================      Employee action types START    =========================



// =====================      Employee action types END    =========================
