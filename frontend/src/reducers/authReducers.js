import {
    REGISTER_EMPLOYEE_REQUEST,
    REGISTER_EMPLOYEE_SUCCESS,
    REGISTER_EMPLOYEE_FAIL,
    REGISTER_EMPLOYEE_RESET,
    REGISTER_EMPLOYER_REQUEST,
    REGISTER_EMPLOYER_SUCCESS,
    REGISTER_EMPLOYER_FAIL,
    REGISTER_EMPLOYER_RESET,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAIL,
    VERIFY_EMAIL_RESET,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    RESEND_VERIFY_EMAIL_REQUEST,
    RESEND_VERIFY_EMAIL_SUCCESS,
    RESEND_VERIFY_EMAIL_FAIL,
    RESEND_VERIFY_EMAIL_RESET,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_RESET,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_UPDATE,
    LOAD_EMPLOYEE_REQUEST,
    LOAD_EMPLOYEE_SUCCESS,
    LOAD_EMPLOYEE_FAIL,
    LOAD_EMPLOYEE_RESET,
    CV_UPDATE,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_RESET,
    GET_USER_BY_EMAIL_REQUEST,
    GET_USER_BY_EMAIL_SUCCESS,
    GET_USER_BY_EMAIL_FAIL,
    GET_USER_BY_EMAIL_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_RESET,
    SHOW_AVATAR_PREVIEW_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_CV_REQUEST,
    UPDATE_CV_SUCCESS,
    UPDATE_CV_FAIL,
    UPDATE_CV_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
} from '../actions/actionTypes'

export const allCategoriesAndSubCategoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_CATEGORIES_SUCCESS:
            return {
                allCategoriesAndSubCategories: action.payload.categories
            }
        case ALL_CATEGORIES_FAIL:
            return {
                error: action.payload
            }

        default: return state
    }
}

export const registerEmployeeReducer = (state = { error: {} }, action) => {
    switch (action.type) {
        case REGISTER_EMPLOYEE_REQUEST:
            return {
                loading: true
            }
        case REGISTER_EMPLOYEE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                userId: action.payload.userId
            }
        case REGISTER_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case REGISTER_EMPLOYEE_RESET:
            return {
                message: null,
                error: null
            }

        default: return state
    }
}

export const registerEmployerReducer = (state = { error: {} }, action) => {
    switch (action.type) {
        case REGISTER_EMPLOYER_REQUEST:
            return {
                loading: true
            }
        case REGISTER_EMPLOYER_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
                userId: action.payload.userId
            }
        case REGISTER_EMPLOYER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case REGISTER_EMPLOYER_RESET:
            return {
                message: null,
                error: null
            }

        default: return state
    }
}

export const verifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFY_EMAIL_REQUEST:
            return {
                loading: true
            }
        case VERIFY_EMAIL_SUCCESS:
            return {
                loading: false,
                message: action.payload,
                success: true
            }
        case VERIFY_EMAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case VERIFY_EMAIL_RESET:
            return {
                ...state,
                message: null,
                error: null,
            }
        default: return state
    }
}

export const getUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                loading: true
            }
        case GET_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload.user
            }

        case GET_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export const getUserByEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_BY_EMAIL_REQUEST:
            return {
                loading: true
            }

        case GET_USER_BY_EMAIL_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
                message: action.payload.message
            }

        case GET_USER_BY_EMAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_USER_BY_EMAIL_RESET:
            return {
                error: null
            }

        default: return state
    }
}

export const resendVerifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case RESEND_VERIFY_EMAIL_REQUEST:
            return {
                loading: true
            }
        case RESEND_VERIFY_EMAIL_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case RESEND_VERIFY_EMAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case RESEND_VERIFY_EMAIL_RESET:
            return {
                message: null,
                error: null
            }
        default: return state
    }
}

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
                isAuthenticated: action.payload.user.isVerified ? true : false
            }

        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                loading: false,
                user: null
            }

        case LOAD_USER_UPDATE:
            return {
                ...state,
                user: action.payload.user
            }
        case CV_UPDATE:
            return {
                ...state,
                userData: action.payload.employee
            }

        case LOGIN_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                logoutError: action.payload
            }

        case LOGOUT_RESET:
            return {
                ...state,
                logoutError: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: null
            }

        case AUTH_RESET:
            return {
                ...state,
                error: null
            }

        default: return state
    }
}

export const loadEmployeeReducer = (state = { employee: {} }, action) => {
    switch (action.type) {
        case LOAD_EMPLOYEE_REQUEST:
            return {
                loading: true
            }
        case LOAD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employee: action.payload.employee
            }

        case LOAD_EMPLOYEE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case LOAD_EMPLOYEE_RESET:
            return {
                ...state,
                error: null
            }
        default: return state
    }

}

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case RESET_PASSWORD_RESET:
            return {
                message: null,
                error: null
            }
        default: return state
    }
}

export const avatarPreviewReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_AVATAR_PREVIEW_SUCCESS:
            return {
                avatarPreview: action.payload
            }
        default: return state
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                error: null,
                message: null
            }

        default: return state
    }
}

export const updateCvReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CV_REQUEST:
            return {
                loading: true
            }
        case UPDATE_CV_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case UPDATE_CV_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_CV_RESET: {
            return {
                ...state,
                error: null,
                message: null
            }
        }
        default: return state
    }
}

export const updatePassword = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            }
        case UPDATE_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_PASSWORD_RESET: {
            return {
                ...state,
                error: null,
                message: null
            }
        }
        default: return state
    }
}