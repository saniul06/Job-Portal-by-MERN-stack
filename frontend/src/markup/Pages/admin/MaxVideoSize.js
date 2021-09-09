import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import { setMaxVideoSize, getMaxVideoSize } from '../../../actions/adminActions'
import { SET_VIDEO_SIZE_RESET } from '../../../actions/actionTypes'

const MaxVideoSize = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { message, error } = useSelector(state => state.setVideoSize)
    const { videoSize, videoId } = useSelector(state => state.getVideoSize)

    const [max, setMax] = useState()

    useEffect(() => {
        dispatch(getMaxVideoSize())
    }, [])

    useEffect(() => {
        setMax(videoSize)
    }, [videoSize])

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: SET_VIDEO_SIZE_RESET })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: SET_VIDEO_SIZE_RESET })
        }
    }, [alert, dispatch, message, error])

    const handleChange = e => {
        setMax(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('MaxVideoSize', max)
        formData.set('videoId', videoId)
        dispatch(setMaxVideoSize(formData))
    }
    return (
        <>
            <MetaData title='Create-category' />
            <Header />
            <div className="page-content bg-white">

                <div className="content-block">

                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarAdmin maxVideoSize='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx submit-resume">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">Set max video size (MB)</h5>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row m-b30">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Video Size</label>
                                                        <input type="text" className="form-control" placeholder="Enter Video size" onChange={handleChange} value={max} />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="site-button m-b30">Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default MaxVideoSize;