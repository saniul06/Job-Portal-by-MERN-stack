import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { favoriteOrUnfavoriteCv } from '../../actions/employerActions'

const CvCard = ({ cv, handleVideoModalShow }) => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const [fav, setFav] = useState(cv.favorites)

    let isFavorite

    if (user) {
        isFavorite = fav.find(fav => fav.employerId.toString() === user._id.toString())
    }

    const handleFavorite = cvId => {
        const formData = new FormData()
        formData.set('cvId', cvId)
        dispatch(favoriteOrUnfavoriteCv(formData, isFavorite, setFav, user._id))
    }

    return (
        <li className="col-lg-4 col-md-6">
            <div className="post-bx">
                <div className="d-flex m-b30">
                    <div className="job-post-info">
                        <h5><Link className="text-dark" to={`/cv/${cv._id}`}>{cv.category}</Link></h5>
                        <ul>
                            <li><i className="fa fa-map-marker"></i>{cv.country}</li>
                            <li><i className="fa fa-bookmark-o"></i> {cv.availability}</li>
                            <li><i className="fa fa-clock-o"></i> {cv.experience} years of experience</li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="job-time mr-auto">
                        <Link to={`/cv/${cv._id}`}><span>Full Time</span></Link>
                    </div>
                    {cv.video.instagramLink && <div style={{ cursor: 'pointer' }} className="salary-bx" onClick={() => handleVideoModalShow(cv.video.instagramLink)}>
                        <span>View Video</span>
                    </div>}
                </div>
                {user && user.role === 'employer' && <label className="like-btn" onClick={() => handleFavorite(cv._id)}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </label>}
            </div>
        </li>
    )
}

export default CvCard
