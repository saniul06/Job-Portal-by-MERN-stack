import axios from 'axios'
import {
    SINGLE_CV_REQUEST,
    SINGLE_CV_SUCCESS,
    SINGLE_CV_FAIL,
} from './actionTypes'

export const getSingleCv = cvId => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_CV_REQUEST })
        const { data } = await axios.get(`/api/cv/${cvId}`)
        dispatch({ type: SINGLE_CV_SUCCESS, payload: data })

    } catch (err) {
        console.log(err)
        dispatch({ type: SINGLE_CV_FAIL, payload: err.response.data.errorMessage })
    }
}