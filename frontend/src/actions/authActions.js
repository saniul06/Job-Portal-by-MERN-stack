import axios from 'axios'
import {
    REGISTER_EMPLOYEE_REQUEST,
    REGISTER_EMPLOYEE_SUCCESS,
    REGISTER_EMPLOYEE_FAIL,
    REGISTER_EMPLOYER_REQUEST,
    REGISTER_EMPLOYER_SUCCESS,
    REGISTER_EMPLOYER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
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
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_UPDATE,
    LOAD_EMPLOYEE_REQUEST,
    LOAD_EMPLOYEE_SUCCESS,
    LOAD_EMPLOYEE_FAIL,
    CV_UPDATE,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    GET_USER_BY_EMAIL_REQUEST,
    GET_USER_BY_EMAIL_SUCCESS,
    GET_USER_BY_EMAIL_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    SHOW_AVATAR_PREVIEW_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_CV_REQUEST,
    UPDATE_CV_SUCCESS,
    UPDATE_CV_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
} from './actionTypes'

export const login = (user, history) => async dispatch => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/login/user', user, config)
        dispatch({ type: LOGIN_SUCCESS, payload: data })
        localStorage.removeItem('forgotPassword')
        localStorage.removeItem('userId')
        history.push(`/login`)

    } catch (err) {
        console.log(err)
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.errorMessage })
        if (err.response.data.user) {
            localStorage.setItem(
                'userId',
                err.response.data.user._id
            );
            history.push(`/verify/email/${err.response.data.userId}`)
        }
    }
}

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/load/user')
        dispatch({ type: LOAD_USER_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.data })
    }
}

export const loadEmployee = id => async dispatch => {
    try {
        dispatch({ type: LOAD_EMPLOYEE_REQUEST })

        const { data } = await axios.get(`/api/load/employee/${id}`)
        dispatch({ type: LOAD_EMPLOYEE_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: LOAD_EMPLOYEE_FAIL, payload: err.response.data })
    }
}

export const getAllCategoriesAndSubCategories = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/categoriesAndSubCategories')
        dispatch({ type: ALL_CATEGORIES_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ALL_CATEGORIES_FAIL, payload: err.response.data.errorMessage })
    }
}

export const registerEmployee = (formData, history) => async dispatch => {
    try {
        dispatch({ type: REGISTER_EMPLOYEE_REQUEST })

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post('/api/register/employee', formData, config)

        dispatch({ type: REGISTER_EMPLOYEE_SUCCESS, payload: data })
        localStorage.setItem(
            'userId',
            data.userId
        );
        history.push(`/verify/email/${data.userId}`)

    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: REGISTER_EMPLOYEE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const registerEmployer = (formData, history) => async dispatch => {
    try {
        dispatch({ type: REGISTER_EMPLOYER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/register/employer', formData, config)

        dispatch({ type: REGISTER_EMPLOYER_SUCCESS, payload: data })
        localStorage.setItem(
            'userId',
            data.userId
        );
        history.push(`/verify/email/${data.userId}`)

    } catch (err) {
        console.log('error is: ', err)
        dispatch({ type: REGISTER_EMPLOYER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const verifyEmail = (verificationCode, history, userId) => async dispatch => {
    try {
        dispatch({ type: VERIFY_EMAIL_REQUEST })
        const { data } = await axios.post(`/api/verify/email`, { verificationCode, userId })
        dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.message })
        if (localStorage.getItem('forgotPassword')) {
            history.push(`/reset-password/${userId}`)
        } else {
            history.push('/login')
        }

    } catch (err) {
        console.log(err)
        dispatch({ type: VERIFY_EMAIL_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getUser = id => async dispatch => {
    try {
        dispatch({ type: GET_USER_REQUEST })
        const { data } = await axios.get(`/api/user/get/${id}`)
        dispatch({ type: GET_USER_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: GET_USER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const resendVerificationEmail = id => async dispatch => {
    try {
        dispatch({ type: RESEND_VERIFY_EMAIL_REQUEST })
        const { data } = await axios.post('/api/resend/email', { id })
        dispatch({ type: RESEND_VERIFY_EMAIL_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: RESEND_VERIFY_EMAIL_FAIL, payload: err.response.data.errorMessage })
    }
}

export const logout = history => async dispatch => {
    try {
        await axios.get('/api/logout')

        dispatch({ type: LOGOUT_SUCCESS })

        history.push('/')

    } catch (err) {
        console.log(err)
        dispatch({ type: LOGOUT_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getUserByEmail = (email, history) => async dispatch => {
    try {
        dispatch({ type: GET_USER_BY_EMAIL_REQUEST })

        const { data } = await axios.post('/api/user/email', { email })

        dispatch({ type: GET_USER_BY_EMAIL_SUCCESS, payload: data })
        history.push(`/verify/email/${data.user._id}`, { from: 'device detail page' })
        localStorage.setItem('forgotPassword', true)
        localStorage.setItem('userId', data.user._id)

    } catch (err) {
        console.log(err)
        dispatch({ type: GET_USER_BY_EMAIL_FAIL, payload: err.response.data.errorMessage })
    }
}

export const resetPassword = (formData, history) => async dispatch => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        const { password, confirmPassword } = formData
        const { data } = await axios.post('/api/reset/password', { password, confirmPassword, userId: localStorage.getItem('userId') })

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data })
        dispatch({ type: VERIFY_EMAIL_RESET })

        history.push('/login')

    } catch (err) {
        console.log(err)
        dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data.errorMessage })
    }
}

export const showAvatarPreview = avatarPreview => dispatch => {
    dispatch({ type: SHOW_AVATAR_PREVIEW_SUCCESS, payload: avatarPreview })
}

export const updateProfile = userData => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const { data } = await axios.post('/api/profile/update', userData)
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: UPDATE_PROFILE_RESET })
        dispatch({ type: LOAD_USER_UPDATE, payload: data })

    } catch (err) {
        console.log(err.response.data.errorMessage)
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const updateCv = userData => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_CV_REQUEST })

        const { data } = await axios.post('/api/cv/update', userData)
        dispatch({ type: UPDATE_CV_SUCCESS, payload: data })
        dispatch({ type: CV_UPDATE, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: UPDATE_CV_FAIL, payload: err.response.data.errorMessage })
    }
}

export const updatePassword = userData => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const { data } = await axios.post('/api/password/update', userData)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err.response.data.errorMessage })
    }
}