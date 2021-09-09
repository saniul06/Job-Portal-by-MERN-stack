import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    allCategoriesAndSubCategoriesReducer,
    registerEmployeeReducer,
    registerEmployerReducer,
    verifyEmailReducer,
    getUserReducer,
    resendVerifyEmailReducer,
    authReducer,
    getUserByEmailReducer,
    resetPasswordReducer,
    avatarPreviewReducer,
    updateProfileReducer,
    updateCvReducer,
    updatePassword,
    loadEmployeeReducer
} from './reducers/authReducers'

import {
    createCategoryReducer,
    getCategoryReducer,
    getsubcategoryReducer,
    deleteCategoryReducer,
    deleteSubCategoryReducer,
    getVideoSizeReducer,
    setVideoSizeReducer,
    getAllCvReducer,
    sendEmailToEmployeeReducer,
    addInstagramVideoLinkReducer,
    deleteVideoReducer,
    cvStatusReducer,
    getVerifiedUserReducer,
    registerAdminReducer,
} from './reducers/adminReducers'

import { getSingleCvReducer } from './reducers/publicReducer'
import { favoriteOrUnfavoriteReducer, allFavoriteCvReducer } from './reducers/employerReducers'

const initialState = {};

const reducers = combineReducers({
    newCategory: createCategoryReducer,
    allCategories: getCategoryReducer,
    allSubcategories: getsubcategoryReducer,
    allCategoriesAndSubCategories: allCategoriesAndSubCategoriesReducer,
    registerEmployee: registerEmployeeReducer,
    registerEmployer: registerEmployerReducer,
    verifyEmail: verifyEmailReducer,
    getUser: getUserReducer,
    resendVerifyEmail: resendVerifyEmailReducer,
    auth: authReducer,
    getUserByEmail: getUserByEmailReducer,
    resetPassword: resetPasswordReducer,
    avatarPreview: avatarPreviewReducer,
    updateProfile: updateProfileReducer,
    updateCv: updateCvReducer,
    updatePassword: updatePassword,
    employee: loadEmployeeReducer,
    deleteCategory: deleteCategoryReducer,
    deleteSubCategory: deleteSubCategoryReducer,
    setVideoSize: setVideoSizeReducer,
    getVideoSize: getVideoSizeReducer,
    allCv: getAllCvReducer,
    sendEmailToEmployee: sendEmailToEmployeeReducer,
    addInstagramVideoLink: addInstagramVideoLinkReducer,
    deleteVideo: deleteVideoReducer,
    cvStatus: cvStatusReducer,
    AllUser: getVerifiedUserReducer,
    registerAdmin: registerAdminReducer,
    singleCv: getSingleCvReducer,
    favoriteCv: favoriteOrUnfavoriteReducer,
    favCvs: allFavoriteCvReducer
});

const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
