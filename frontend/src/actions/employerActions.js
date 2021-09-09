import axios from 'axios'
import {
    FAVORITE_OR_UNFAVORITE_CV_REQUEST,
    FAVORITE_OR_UNFAVORITE_CV_SUCCESS,
    FAVORITE_OR_UNFAVORITE_CV_FAIL,
    ALL_FAVORITE_CV_REQUEST,
    ALL_FAVORITE_CV_SUCCESS,
    ALL_FAVORITE_CV_FAIL,
} from './actionTypes'

export const favoriteOrUnfavoriteCv = (obj, isFavorite, setFav, userId) => async dispatch => {
    try {
        dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_REQUEST })
        const { data } = await axios.post('/api/cv/favorite', obj)
        dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_SUCCESS, payload: data })

        if (isFavorite) {
            setFav(prev => prev.filter(fav => fav.employerId.toString() !== userId.toString()))
        } else {
            setFav(prev => [...prev, { employerId: userId }])
        }
    } catch (err) {
        console.log(err)
        dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_FAIL, payload: err.response.data.errorMessage })
    }
}

export const deleteFavoriteCv = (obj, setCvs, cvId) => async dispatch => {
    try {
        dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_REQUEST })
        const { data } = await axios.post('/api/cv/favorite', obj)
        dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_SUCCESS, payload: data })

        setCvs(prev => prev.filter(cv => cv._id !== cvId))

    } catch (err) {
        console.log(err)
        dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_FAIL, payload: err.response.data.errorMessage })
    }
}

export const getAllFavoriteCv = (currentPage = 1) => async dispatch => {
    try {
        dispatch({ type: ALL_FAVORITE_CV_REQUEST })
        const { data } = await axios.get(`/api/cv/all/favorite?page=${currentPage}`)
        dispatch({ type: ALL_FAVORITE_CV_SUCCESS, payload: data })

        // if (isFavorite) {
        //     setFav(prev => prev.filter(fav => fav.employerId.toString() !== userId.toString()))
        // } else {
        //     setFav(prev => [...prev, { employerId: userId }])
        // }
    } catch (err) {
        console.log(err)
        dispatch({ type: ALL_FAVORITE_CV_FAIL, payload: err.response.data.errorMessage })
    }
}