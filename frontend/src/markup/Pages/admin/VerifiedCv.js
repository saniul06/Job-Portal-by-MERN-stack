import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import CvActions from '../../Element/CvActions'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from 'react-js-pagination';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData'
import { Modal } from 'react-bootstrap';
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin';
import { getAllCv, sendEmailToEmployee, addInstagramVideoLink, deleteVideo, deleteUserAndCv } from '../../../actions/adminActions'
import { ALL_CV_RESET, SEND_EMAIL_TO_EMPLOYEE_RESET, ADD_INSTAGRAM_VIDEO_LINK_RESET, VIDEO_DELETE_RESET, ACTIVATE_OR_DEACTIVATE_RESET, DELETE_CV_AND_EMPLOYEE_RESET } from '../../../actions/actionTypes'
// import '../../../css/embed.css'
import InstagramEmbed from 'react-instagram-embed';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


const VerifiedCv = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const classes = useStyles();

    const {
        loading, allCv, itemsPerPage, totalCv, count, error
    } = useSelector(state => state.allCv)

    const {
        loading: emailLoading,
        message: emailMessage,
        error: emailError
    } = useSelector(state => state.sendEmailToEmployee)

    const {
        loading: videoLoading,
        message: videoMessage,
        error: videoError
    } = useSelector(state => state.addInstagramVideoLink)

    const {
        loading: videoDeleteLoading,
        message: videoDeleteMessage,
        error: videoDeleteError
    } = useSelector(state => state.deleteVideo)

    const { loading: cvStatusLoading,
        message: cvStatuseMessage,
        error: cvStatusError
    } = useSelector(state => state.cvStatus)

    const [currentPage, setCurrentPage] = useState(1)
    const [profileModal, setProfileModal] = useState(false)
    const [sendEmailModal, setSendEmailModal] = useState(false)
    const [localVideoModal, setLocalVideoModal] = useState(false)
    const [instagramVideoModal, setInstagramVideoModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [profile, setProfile] = useState(null)
    const [deleteProfileModal, setDeleteProfileModal] = useState(false)
    const [cvs, setCvs] = useState()
    const [videoLink, setVideoLink] = useState()
    const [cvId, setCvId] = useState()
    const [userId, setUserId] = useState()
    const [isApproved, setIsApproved] = useState()
    const [isActivated, setIsActivated] = useState()
    const [getAll, setGetAll] = useState(1)

    useEffect(() => {
        dispatch(getAllCv(currentPage, isApproved, isActivated, getAll))
    }, [currentPage, isApproved, isActivated, getAll])

    useEffect(() => {
        if (allCv) {
            setCvs(allCv)
        }
    }, [allCv, currentPage, isApproved, isActivated, getAll])

    useEffect(() => {
        if (cvStatuseMessage) {
            alert.success(cvStatuseMessage)
            dispatch({ type: ACTIVATE_OR_DEACTIVATE_RESET })
        }

        if (cvStatusError) {
            alert.error(cvStatusError)
            dispatch({ type: ACTIVATE_OR_DEACTIVATE_RESET })
        }
    }, [cvStatuseMessage, cvStatusError])

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error)
    //         dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_RESET })
    //     }
    // }, [error])

    // useEffect(() => {
    //     if (emailMessage) {
    //         setSendEmailModal(false)
    //         alert.success(emailMessage)
    //         dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_RESET })
    //         console.log('emailMessage is:', emailMessage)

    //     }
    //     if (emailError) {
    //         alert.error(emailError)
    //         dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_RESET })
    //         console.log('emailError is:', emailError)
    //     }
    // }, [alert, dispatch, emailError, emailMessage])

    useEffect(() => {
        if (videoDeleteMessage) {
            alert.success(videoDeleteMessage)
            dispatch({ type: VIDEO_DELETE_RESET })
        }

        if (videoDeleteError) {
            alert.error(videoDeleteError)
            dispatch({ type: VIDEO_DELETE_RESET })
        }

    }, [videoDeleteMessage, videoDeleteError])

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const profileModalClose = () => {
        setProfileModal(false)
        setCvId()
    };
    const profileShow = cv => {
        setProfile(cv)
        setProfileModal(true)
    };

    const sendEmailShow = (name, email) => {
        setSendEmailModal(true)
        setName(name)
        setEmail(email)
        dispatch({ type: SEND_EMAIL_TO_EMPLOYEE_RESET })
    }

    const sendEmailClose = () => {
        setSendEmailModal(false)
        setName('')
        setEmail('')
        setSubject('')
        setBody('')
        setCvId()
    }

    const instagramVideoShow = (id, instagramLink) => {
        if (instagramLink) {
            setVideoLink(instagramLink)
        }
        setInstagramVideoModal(true)
        setCvId(id)
        dispatch({ type: ADD_INSTAGRAM_VIDEO_LINK_RESET })
    }

    const instagramVideoModalClose = () => {
        setInstagramVideoModal(false)
        setCvId()
    }

    const handleInstagramVideoSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('_id', cvId)
        formData.set('link', videoLink)
        dispatch(addInstagramVideoLink(formData))
    }

    const handleLocalVideoDelete = () => {
        const formData = new FormData()
        formData.set('_id', cvId)
        dispatch(deleteVideo(formData))
        setCvId()
        setLocalVideoModal(false)
    }

    const handleEmailSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('subject', subject)
        formData.set('body', body)
        dispatch(sendEmailToEmployee(formData))
        setSubject('')
        setBody('')
    }

    const deleteProfileShow = userId => {
        setUserId(userId._id)
        setDeleteProfileModal(true)
    }

    const deleteProfileModalClose = () => {
        setDeleteProfileModal(false)
        setUserId()
    }

    const deleteLocalVideoShow = cvId => {
        setCvId(cvId)
        setLocalVideoModal(true)
    }

    const localVideoModalClose = () => {
        setLocalVideoModal(false)
        setCvId()
    }

    const handleDeleteProfileSubmit = () => {
        const formData = new FormData()
        formData.set('userId', userId)
        dispatch(deleteUserAndCv(formData, userId, setCvs))
        setDeleteProfileModal(false)
        setUserId()
    }

    const handleSelect = e => {
        if (e.target.value === 'Approved') {
            setIsApproved(1)
            setIsActivated(0)
            setGetAll(0)
        } else if (e.target.value === 'Activated') {
            setIsApproved(0)
            setIsActivated(1)
            setGetAll(0)
        } else if (e.target.value === 'All') {
            setGetAll(1)
            setIsApproved(0)
            setIsActivated(0)
        }
    }

    return (
        <>
            <Header />
            <MetaData title='Verifies-Cv' />
            <div className="page-content bg-white" style={{ pointerEvents: loading || emailLoading || videoLoading || videoDeleteLoading || cvStatusLoading ? 'none' : '' }}>
                {/* <iframe src="https://www.instagram.com/reel/CSrovvoh1XT/embed" width="400" height="480" frameBorder="0" scrolling="no" allowtransparency="false" caption='false'></iframe> */}

                <div className="content-block">

                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarAdmin Cv='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">

                                    <div className="job-bx save-job browse-job table-job-bx clearfix">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">{cvs && cvs.length} Cv's</h5>
                                            <div className="float-right">
                                                <span className="select-title">Sort by Status</span>
                                                <select onChange={handleSelect} className="custom-btn">
                                                    <option>Select</option>
                                                    <option>All</option>
                                                    <option>Approved</option>
                                                    <option>Activated</option>
                                                </select>
                                            </div>
                                        </div>
                                        <table className='text-center'>
                                            <thead>
                                                <tr>
                                                    <th>Approved</th>
                                                    <th>Activated</th>
                                                    <th>Video</th>
                                                    <th>Actions</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {loading ? <div className="center-progress"><CircularProgress style={{ color: '#000' }} /></div> : <tbody>
                                                {cvs && cvs.map((cv, index) => {
                                                    if (cv.userId.isVerified) return (
                                                        <CvActions
                                                            index={index}
                                                            cv={cv}
                                                            instagramVideoShow={instagramVideoShow}
                                                            sendEmailShow={sendEmailShow}
                                                            profileShow={profileShow}
                                                            deleteProfileShow={deleteProfileShow}
                                                            deleteLocalVideoShow={deleteLocalVideoShow}
                                                        />
                                                    )
                                                })}

                                            </tbody>}
                                        </table>

                                        {count > itemsPerPage && (
                                            <div className="pagination-bx float-right">
                                                {/* <ul className="pagination"> */}
                                                <Pagination
                                                    activePage={currentPage}
                                                    itemsCountPerPage={itemsPerPage}
                                                    totalItemsCount={count}
                                                    nextPageText="Next"
                                                    prevPageText="Prev"
                                                    firstPageText="First"
                                                    lastPageText="Last"
                                                    onChange={setCurrentPageNo}
                                                    itemClass="page-item"
                                                    linkClass="page-link"
                                                />
                                                {/* </ul> */}
                                            </div>
                                        )}
                                    </div>


                                    {profile && (
                                        <Modal show={profileModal} onHide={profileModalClose} className=" modal fade modal-bx-info" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog  m-0" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <div className="logo-img">
                                                            {profile.userId.avatar.avatarId && <img src={`https://drive.google.com/uc?export=view&id=${profile.userId.avatar.avatarId}`} alt="image" width={200} height={200} />}
                                                        </div>
                                                        <h5 className="modal-title">Profile Info</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={profileModalClose}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ul>
                                                            <li><strong>Name :</strong><p> {profile.userId.name} </p></li>
                                                            <li><strong>Email :</strong><p> {profile.userId.email} </p></li>
                                                            <li><strong>Country :</strong><p>{profile.country}</p></li>
                                                            <li><strong>Category :</strong><p>{profile.category}</p></li>
                                                            <li><strong>Sub-Category :</strong><p>{profile.subcategory}</p></li>
                                                            <li><strong>Phone :</strong><p>{profile.phone ? profile.phone : "Not given"}</p></li>
                                                            <li><strong>State :</strong><p>{profile.state ? profile.state : "Not given"}</p></li>
                                                            <li><strong>Experience :</strong><p>{profile.experience ? profile.experience : "Not given"}</p></li>
                                                            <li><strong>Availability :</strong><p>{profile.availability ? profile.availability : "Not given"}</p></li>
                                                        </ul>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={profileModalClose}>Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    )}

                                    <Modal show={sendEmailModal} onHide={sendEmailClose} className=" modal fade modal-bx-info" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                        <div className="modal-dialog  m-0" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Send Email to <span className='text-info'>{email}</span></h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={sendEmailClose}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={handleEmailSubmit}>
                                                        <p className="text-success">{emailMessage && emailMessage}</p>
                                                        <p className="text-danger">{emailError && emailError}</p>
                                                        <ul>
                                                            <li>  <TextField
                                                                id="standard-textarea"
                                                                label="Email subject"
                                                                multiline
                                                                onChange={e => setSubject(e.target.value)}
                                                                value={subject}
                                                            /></li>
                                                            <li>     <TextField
                                                                id="standard-multiline-static"
                                                                label="Email body"
                                                                multiline
                                                                rows={2}
                                                                onChange={e => setBody(e.target.value)}
                                                                value={body}
                                                            /></li>
                                                            <br />
                                                            <li><Button disabled={emailLoading ? true : false} type="submit" variant="contained" color="primary">
                                                                Send
                                                            </Button></li>
                                                        </ul>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={sendEmailClose}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>

                                    <Modal show={instagramVideoModal} onHide={instagramVideoModalClose} className=" modal fade modal-bx-info" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                        <div className="modal-dialog  m-0" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Add Instagram Video Link</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={instagramVideoModalClose}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={handleInstagramVideoSubmit}>
                                                        <p className="text-success">{videoMessage && videoMessage}</p>
                                                        <p className="text-danger">{videoError && videoError}</p>
                                                        <ul>
                                                            <li>  <TextField
                                                                id="standard-textarea"
                                                                label="Instagram video link"
                                                                multiline
                                                                value={videoLink}
                                                                onChange={e => setVideoLink(e.target.value)}
                                                            /></li>
                                                            <br />
                                                            <li><Button disabled={videoLoading ? true : false} type="submit" variant="contained" color="primary">
                                                                Add
                                                            </Button></li>
                                                        </ul>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={instagramVideoModalClose}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>

                                    <Modal show={deleteProfileModal} onHide={deleteProfileModalClose} className=" modal fade modal-bx-info" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                        <div className="modal-dialog  m-0" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title text-danger">Delete Profile and Cv</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={deleteProfileModalClose}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure to delete?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleDeleteProfileSubmit}>Confirm</button>

                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={deleteProfileModalClose}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>

                                    <Modal show={localVideoModal} onHide={localVideoModalClose} className=" modal fade modal-bx-info" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                        <div className="modal-dialog  m-0" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title text-danger">Delete Video From Server</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={localVideoModalClose}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure to delete?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleLocalVideoDelete}>Confirm</button>

                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={localVideoModalClose}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>



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

export default VerifiedCv;