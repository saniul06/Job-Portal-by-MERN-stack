import {
    FAVORITE_OR_UNFAVORITE_CV_REQUEST,
    FAVORITE_OR_UNFAVORITE_CV_SUCCESS,
    FAVORITE_OR_UNFAVORITE_CV_FAIL,
    FAVORITE_OR_UNFAVORITE_CV_RESET,
    ALL_FAVORITE_CV_REQUEST,
    ALL_FAVORITE_CV_SUCCESS,
    ALL_FAVORITE_CV_FAIL,
    ALL_FAVORITE_CV_RESET,
} from '../actions/actionTypes'

export const favoriteOrUnfavoriteReducer = (state = {}, action) => {
    switch (action.type) {
        case FAVORITE_OR_UNFAVORITE_CV_REQUEST:
            return {
                loading: true
            }
        case FAVORITE_OR_UNFAVORITE_CV_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
            }
        case FAVORITE_OR_UNFAVORITE_CV_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case FAVORITE_OR_UNFAVORITE_CV_RESET:
            return {
                ...state,
                message: false,
                error: false
            }
        default: return state
    }
}

export const allFavoriteCvReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_FAVORITE_CV_REQUEST:
            return {
                loading: true
            }
        case ALL_FAVORITE_CV_SUCCESS:
            return {
                loading: false,
                favCvs: action.payload.favCvs,
                itemsPerPage: action.payload.itemsPerPage,
                count: action.payload.count,
                message: action.payload.message
            }
        case ALL_FAVORITE_CV_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ALL_FAVORITE_CV_RESET:
            return {
                ...state,
                message: false,
                error: false
            }
        default: return state
    }
}