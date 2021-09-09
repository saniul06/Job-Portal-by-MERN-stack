import {
    SINGLE_CV_REQUEST,
    SINGLE_CV_SUCCESS,
    SINGLE_CV_FAIL,
    SINGLE_CV_RESET,
} from '../actions/actionTypes'

export const getSingleCvReducer = (state = {}, action) => {
    switch (action.type) {
        case SINGLE_CV_REQUEST:
            return {
                loading: true
            }

        case SINGLE_CV_SUCCESS:
            return {
                loading: false,
                cv: action.payload.cv
            }

        case SINGLE_CV_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SINGLE_CV_RESET:
            return {
                ...state,
                error: false
            }

        default: return state
    }
}