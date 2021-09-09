import axios from 'axios'
import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_SUBCATEGORIES_SUCCESS,
    GET_SUBCATEGORIES_FAIL,
    SET_VIDEO_SIZE_SUCCESS,
    SET_VIDEO_SIZE_FAIL,
    GET_VIDEO_SIZE_SUCCESS,
    GET_VIDEO_SIZE_FAIL,
    ALL_CV_REQUEST,
    ALL_CV_SUCCESS,
    ALL_CV_FAIL,
    ALL_ACTIVE_CV_REQUEST,
    ALL_ACTIVE_CV_SUCCESS,
    ALL_ACTIVE_CV_FAIL,
    VERIFIED_USER_REQUEST,
    VERIFIED_USER_SUCCESS,
    VERIFIED_USER_FAIL,
    UNVERIFIED_USER_REQUEST,
    UNVERIFIED_USER_SUCCESS,
    UNVERIFIED_USER_FAIL,
    SEND_EMAIL_TO_EMPLOYEE_REQUEST,
    SEND_EMAIL_TO_EMPLOYEE_SUCCESS,
    SEND_EMAIL_TO_EMPLOYEE_FAIL,
    ADD_INSTAGRAM_VIDEO_LINK_REQUEST,
    ADD_INSTAGRAM_VIDEO_LINK_SUCCESS,
    ADD_INSTAGRAM_VIDEO_LINK_FAIL,
    VIDEO_DELETE_REQUEST,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAIL,
    APPROVE_OR_DISAPPROVE_REQUEST,
    APPROVE_OR_DISAPPROVE_SUCCESS,
    APPROVE_OR_DISAPPROVE_FAIL,
    ACTIVATE_OR_DEACTIVATE_REQUEST,
    ACTIVATE_OR_DEACTIVATE_SUCCESS,
    ACTIVATE_OR_DEACTIVATE_FAIL,
    DELETE_CV_AND_EMPLOYEE_REQUEST,
    DELETE_CV_AND_EMPLOYEE_SUCCESS,
    DELETE_CV_AND_EMPLOYEE_FAIL,
    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL,
} from './actionTypes'

export const createCategory = obj => async dispatch => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST })
        const { data } = await axios.post('/api/create-category', obj)
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: CREATE_CATEGORY_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteCategory = (obj, type) => async dispatch => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST })
        const { data } = await axios.post('/api/delete-category', obj)
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data })
        dispatch(getCategories())


    } catch (err) {
        console.log(err)
        dispatch({ type: DELETE_CATEGORY_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteSubCategory = obj => async dispatch => {
    try {
        dispatch({ type: DELETE_SUBCATEGORY_REQUEST })
        const { data } = await axios.post('/api/delete-subcategory', obj)
        dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: data })
        dispatch(getSubCategories())

    } catch (err) {
        console.log(err)
        dispatch({ type: DELETE_SUBCATEGORY_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getCategories = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/get-categories')
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        if (err.response) {
            dispatch({ type: GET_CATEGORIES_FAIL, payload: err.response.data.errorMessage })
        }
    }
}

export const getSubCategories = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/get-subcategories')
        dispatch({ type: GET_SUBCATEGORIES_SUCCESS, payload: data })
        console.log(data)
    } catch (err) {
        console.log(err)
        if (err.response) {
            dispatch({ type: GET_SUBCATEGORIES_FAIL, payload: err.response.data.errorMessage })
        }
    }
}

export const getMaxVideoSize = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/get-max-video-size')
        dispatch({ type: GET_VIDEO_SIZE_SUCCESS, payload: data.video })
    } catch (err) {
        console.log(err)
        if (err.response) {
            dispatch({ type: GET_VIDEO_SIZE_FAIL, payload: err.response.data.errorMessage })
        }
    }
}

export const setMaxVideoSize = obj => async dispatch => {
    try {
        const { data } = await axios.post('/api/set-max-video-size', obj)
        dispatch({ type: SET_VIDEO_SIZE_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        if (err.response) {
            dispatch({ type: SET_VIDEO_SIZE_FAIL, payload: err.response.data.errorMessage })
        }
    }
}

export const getAllCv = (currentPage = 1, isApproved = 0, isActivated = 0, getAllCv = true) => async dispatch => {
    try {
        dispatch({ type: ALL_CV_REQUEST })
        let url;
        if (getAllCv) {
            url = `/api/cv/all?page=${currentPage}`
        } else if (isApproved === 1) {
            url = `/api/cv/all?page=${currentPage}&isApproved=${isApproved}`
        } else if (isActivated === 1) {
            url = `/api/cv/all?page=${currentPage}&isActivated=${isActivated}`
        }

        const { data } = await axios.get(url)
        console.log(data.cvs)
        dispatch({ type: ALL_CV_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ALL_CV_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getAllActivatedCv = (currentPage = 1, category = '', subcategory = '', country = '', experience = '', availability = '', getAllCv = true, isApproved = 1, isActivated = 1,) => async dispatch => {
    try {
        dispatch({ type: ALL_ACTIVE_CV_REQUEST })
        let url = `/api/cv/all?page=${currentPage}&isApproved=${1}&isActivated=${1}`;
        if (category) {
            url += `&category=${category}`
        } if (subcategory) {
            url += `&subcategory=${subcategory}`

        } if (country) {
            url += `&country=${country}`

        } if (experience) {
            url += `&experience=${experience}`

        } if (availability) {
            url += `&availability=${availability}`
        }
    
        console.log('url is: ', url)

        const { data } = await axios.get(url)
        dispatch({ type: ALL_ACTIVE_CV_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ALL_ACTIVE_CV_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getVerifiedUser = (currentPage = 1, isVerified = 1, admin = '', employee = '', employer = '', getAll = '') => async dispatch => {
    try {
        dispatch({ type: VERIFIED_USER_REQUEST })
        let url
        if (getAll) {
            url = `/api/user/verified?page=${currentPage}&isVerified=${isVerified}`
        } else if (admin) {
            url = `/api/user/verified?page=${currentPage}&isVerified=${isVerified}&role=${admin}`
        } else if (employee) {
            url = `/api/user/verified?page=${currentPage}&isVerified=${isVerified}&role=${employee}`
        } else if (employer) {
            url = `/api/user/verified?page=${currentPage}&isVerified=${isVerified}&role=${employer}`
        }

        const { data } = await axios.get(url)

        dispatch({ type: VERIFIED_USER_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: VERIFIED_USER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getUnverifiedUser = (currentPage = 1, isVerified = 0) => async dispatch => {
    try {
        dispatch({ type: UNVERIFIED_USER_REQUEST })
        let url = `/api/user/unverified?page=${currentPage}&isVerified=${isVerified}`
        const { data } = await axios.get(url)

        dispatch({ type: UNVERIFIED_USER_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: UNVERIFIED_USER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const sendEmailToEmployee = obj => async dispatch => {
    try {
        dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_REQUEST })
        const { data } = await axios.post('/api/send-email-to-employee', obj)
        dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const addInstagramVideoLink = obj => async dispatch => {
    try {
        dispatch({ type: ADD_INSTAGRAM_VIDEO_LINK_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/cv/add-instagram-video-link', obj, config)
        dispatch({ type: ADD_INSTAGRAM_VIDEO_LINK_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: ADD_INSTAGRAM_VIDEO_LINK_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteVideo = obj => async dispatch => {
    try {
        dispatch({ type: VIDEO_DELETE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/cv/delete-video', obj, config)
        dispatch({ type: VIDEO_DELETE_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: VIDEO_DELETE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const approveOrDisapprove = (obj, setIsApproved) => async dispatch => {
    try {
        dispatch({ type: APPROVE_OR_DISAPPROVE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/cv/approve-or-disapprove', obj, config)
        dispatch({ type: APPROVE_OR_DISAPPROVE_SUCCESS, payload: data })

        setIsApproved(prev => prev ? 0 : 1)

    } catch (err) {
        console.log(err)
        dispatch({ type: APPROVE_OR_DISAPPROVE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const activateOrDeactivate = (obj, setIsActivated) => async dispatch => {
    try {
        dispatch({ type: ACTIVATE_OR_DEACTIVATE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/cv/activate-or-deactivate', obj, config)
        dispatch({ type: ACTIVATE_OR_DEACTIVATE_SUCCESS, payload: data })

        setIsActivated(prev => prev ? 0 : 1)

    } catch (err) {
        console.log(err)
        dispatch({ type: ACTIVATE_OR_DEACTIVATE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteUserAndCv = (obj, userId, setFunc, from) => async dispatch => {
    try {
        dispatch({ type: DELETE_CV_AND_EMPLOYEE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/delete-user-and-cv', obj, config)

        if (from === 'unverifiedUser' || from === 'verifiedUser') {
            setFunc(prev => prev.filter(user => user._id !== userId))

        } else {
            setFunc(prev => prev.filter(cv => cv.userId._id !== userId))
        }

        dispatch({ type: DELETE_CV_AND_EMPLOYEE_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: DELETE_CV_AND_EMPLOYEE_FAIL, payload: err.response.data.errorMessage })
    }
}

export const registerAdmin = obj => async dispatch => {
    try {
        dispatch({ type: REGISTER_ADMIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/register/admin', obj, config)
        dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: REGISTER_ADMIN_FAIL, payload: err.response.data.errorMessage })
    }
}

