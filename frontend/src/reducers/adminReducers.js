import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    CLEAR_CATEGORY,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_RESET,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_RESET,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    CLEAR_GET_CATEGORIES,
    GET_SUBCATEGORIES_SUCCESS,
    GET_SUBCATEGORIES_FAIL,
    CLEAR_GET_SUBCATEGORIES,
    SET_VIDEO_SIZE_SUCCESS,
    SET_VIDEO_SIZE_FAIL,
    SET_VIDEO_SIZE_RESET,
    GET_VIDEO_SIZE_SUCCESS,
    GET_VIDEO_SIZE_FAIL,
    GET_VIDEO_SIZE_RESET,
    ALL_CV_REQUEST,
    ALL_CV_SUCCESS,
    ALL_CV_FAIL,
    ALL_CV_RESET,
    ALL_ACTIVE_CV_REQUEST,
    ALL_ACTIVE_CV_SUCCESS,
    ALL_ACTIVE_CV_FAIL,
    ALL_ACTIVE_CV_RESET,
    VERIFIED_USER_REQUEST,
    VERIFIED_USER_SUCCESS,
    VERIFIED_USER_FAIL,
    VERIFIED_USER_RESET,
    UNVERIFIED_USER_REQUEST,
    UNVERIFIED_USER_SUCCESS,
    UNVERIFIED_USER_FAIL,
    UNVERIFIED_USER_RESET,
    SEND_EMAIL_TO_EMPLOYEE_REQUEST,
    SEND_EMAIL_TO_EMPLOYEE_SUCCESS,
    SEND_EMAIL_TO_EMPLOYEE_FAIL,
    SEND_EMAIL_TO_EMPLOYEE_RESET,
    ADD_INSTAGRAM_VIDEO_LINK_REQUEST,
    ADD_INSTAGRAM_VIDEO_LINK_SUCCESS,
    ADD_INSTAGRAM_VIDEO_LINK_FAIL,
    ADD_INSTAGRAM_VIDEO_LINK_RESET,
    VIDEO_DELETE_REQUEST,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAIL,
    VIDEO_DELETE_RESET,
    APPROVE_OR_DISAPPROVE_REQUEST,
    APPROVE_OR_DISAPPROVE_SUCCESS,
    APPROVE_OR_DISAPPROVE_FAIL,
    APPROVE_OR_DISAPPROVE_RESET,
    ACTIVATE_OR_DEACTIVATE_REQUEST,
    ACTIVATE_OR_DEACTIVATE_SUCCESS,
    ACTIVATE_OR_DEACTIVATE_FAIL,
    ACTIVATE_OR_DEACTIVATE_RESET,
    DELETE_CV_AND_EMPLOYEE_REQUEST,
    DELETE_CV_AND_EMPLOYEE_SUCCESS,
    DELETE_CV_AND_EMPLOYEE_FAIL,
    DELETE_CV_AND_EMPLOYEE_RESET,
    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,
    REGISTER_ADMIN_RESET,
} from '../actions/actionTypes'

export const createCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case CREATE_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_CATEGORY:
            return {
                ...state,
                error: null,
                message: null
            }

        default: return state
    }
}

export const getCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories,
            }
        case GET_CATEGORIES_FAIL:
            return {
                error: action.payload
            }
        case CLEAR_GET_CATEGORIES:
            return {
                ...state,
                error: null,
                message: null
            }

        default: return state
    }
}

export const getsubcategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                subcategories: action.payload.subcategories
            }
        case GET_SUBCATEGORIES_FAIL:
            return {
                error: action.payload
            }
        case CLEAR_GET_SUBCATEGORIES:
            return {
                ...state,
                error: null,
                message: null
            }

        default: return state
    }
}

export const deleteCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                loading: true
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                loading: false,
                message: action.payload.message

            }
        case DELETE_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload

            }
        case DELETE_CATEGORY_RESET:
            return {
                ...state,
                error: null,
                message: null
            }

        default: return state
    }
}

export const deleteSubCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SUBCATEGORY_REQUEST:
            return {
                loading: true
            }
        case DELETE_SUBCATEGORY_SUCCESS:
            return {
                loading: false,
                message: action.payload.message

            }
        case DELETE_SUBCATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload

            }
        case DELETE_SUBCATEGORY_RESET:
            return {
                ...state,
                error: null,
                message: null
            }

        default: return state
    }
}

export const getVideoSizeReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_VIDEO_SIZE_SUCCESS:
            return {
                videoSize: action.payload.MaxVideoSize,
                videoId: action.payload._id
            }
        case GET_VIDEO_SIZE_FAIL:
            return {
                error: action.payload.error
            }

        case GET_VIDEO_SIZE_RESET:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}

export const setVideoSizeReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_VIDEO_SIZE_SUCCESS:
            return {
                message: action.payload.message
            }
        case SET_VIDEO_SIZE_FAIL:
            return {
                error: action.payload.error
            }

        case SET_VIDEO_SIZE_RESET:
            return {
                message: null,
                error: null
            }
        default: return state
    }
}

export const getAllCvReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CV_REQUEST:
        case ALL_ACTIVE_CV_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ALL_CV_SUCCESS:
        case ALL_ACTIVE_CV_SUCCESS:
            return {
                loading: false,
                allCv: action.payload.cvs,
                itemsPerPage: action.payload.itemsPerPage,
                totalCv: action.payload.totalCv,
                count: action.payload.count
            }

        case ALL_CV_FAIL:
        case ALL_ACTIVE_CV_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ALL_CV_RESET:
        case ALL_ACTIVE_CV_RESET:
            return {
                ...state,
                error: null
            }

        default: return state
    }
}

export const getVerifiedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFIED_USER_REQUEST:
        case UNVERIFIED_USER_REQUEST:
            return {
                loading: true
            }

        case VERIFIED_USER_SUCCESS:
        case UNVERIFIED_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                itemsPerPage: action.payload.itemsPerPage,
                totalUser: action.payload.totalUser,
                count: action.payload.count
            }

        case VERIFIED_USER_FAIL:
        case UNVERIFIED_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case VERIFIED_USER_RESET:
        case UNVERIFIED_USER_RESET:
            return {
                ...state,
                error: null
            }
        default: return state
    }
}

export const sendEmailToEmployeeReducer = (state = {}, action) => {
    switch (action.type) {
        case SEND_EMAIL_TO_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEND_EMAIL_TO_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case SEND_EMAIL_TO_EMPLOYEE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SEND_EMAIL_TO_EMPLOYEE_RESET:
            return {
                ...state,
                error: null,
                message: null
            }
        default: return state
    }
}

export const addInstagramVideoLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_INSTAGRAM_VIDEO_LINK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_INSTAGRAM_VIDEO_LINK_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case ADD_INSTAGRAM_VIDEO_LINK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_INSTAGRAM_VIDEO_LINK_RESET:
            return {
                ...state,
                error: null,
                message: null
            }
        default: return state
    }
}

export const deleteVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case VIDEO_DELETE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case VIDEO_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case VIDEO_DELETE_RESET:
            return {
                ...state,
                error: null,
                message: null
            }
        default: return state
    }
}

export const cvStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case APPROVE_OR_DISAPPROVE_REQUEST:
        case ACTIVATE_OR_DEACTIVATE_REQUEST:
        case DELETE_CV_AND_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case APPROVE_OR_DISAPPROVE_SUCCESS:
        case ACTIVATE_OR_DEACTIVATE_SUCCESS:
        case DELETE_CV_AND_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case APPROVE_OR_DISAPPROVE_FAIL:
        case ACTIVATE_OR_DEACTIVATE_FAIL:
        case DELETE_CV_AND_EMPLOYEE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPROVE_OR_DISAPPROVE_RESET:
        case ACTIVATE_OR_DEACTIVATE_RESET:
        case DELETE_CV_AND_EMPLOYEE_RESET:
            return {
                ...state,
                error: null,
                message: null
            }
        default: return state
    }
}

export const registerAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_ADMIN_REQUEST:
            return {
                loading: true
            }
        case REGISTER_ADMIN_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case REGISTER_ADMIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case REGISTER_ADMIN_RESET:
            return {
                ...state,
                message: null,
                error: null
            }
        default: return state
    }
}
