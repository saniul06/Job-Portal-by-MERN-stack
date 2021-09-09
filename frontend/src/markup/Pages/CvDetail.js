import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MetaData from '../Layout/MetaData'
import Sidebar from '../Element/Sidebar';
import { getSingleCv } from '../../actions/publicActions'
import { SINGLE_CV_RESET } from '../../actions/actionTypes'

const CvDetail = ({ match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, cv, error: cvError } = useSelector(state => state.singleCv)

    useEffect(() => {
        dispatch(getSingleCv(match.params.cvId))
    }, [match.params.cvId])

    useEffect(() => {
        if (cvError) {
            alert.error(cvError)
            dispatch({ type: SINGLE_CV_RESET })
        }
    }, [cvError])

    return (
        <>
            <MetaData title="Cv-Detail" />
            <Header />
            <div className="page-content bg-white">

                <div className="dez-bnr-inr bg-cv1">
                    <div className="container">
                        <div className="dez-bnr-inr-entry">
                            <h1 className="text-white">CV Details</h1>

                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li>Cv Details</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="content-area">
                    <div className="container">
                        <div className="row">
                            {loading ? <div className="center-progress"><CircularProgress style={{ color: '#000' }} /></div> : (
                                cv ? (
                                    <div className="col-lg-12 col-md-12 m-b10">

                                        <div className="blog-post blog-single blog-style-1">
                                            <div className="dez-post-meta">
                                                <ul className="d-flex align-items-center">
                                                    <li className="post-date"><i className="fa fa-calendar"></i>{new Date(cv.createdAt).toDateString()}</li>
                                                    <li className="post-author"><i className="fa fa-user"></i>By <Link to={"#"}>{cv.userId.name}</Link> </li>
                                                    <li className="post-comment"><i className="fa fa-comments-o"></i><Link style={{ textTransform: "none" }} to={"#"}>{cv.userId.email}</Link> </li>
                                                </ul>
                                            </div>

                                            {cv.video.instagramLink && <iframe src={`${cv.video.instagramLink}embed`} width="400" height="480" frameBorder="0" scrolling="no" allowtransparency="false" caption='false'></iframe>}
                                            <div className="cv-details">
                                                <h2 className="text-dark" style={{ textDecoration: "underline" }}>Employee Details</h2>
                                                <br />
                                                <p>Country: <span>{cv.country}</span></p>

                                                <p>Category: <span>{cv.category}</span></p>

                                                <p>Sub category: <span>{cv.subcategory}</span></p>

                                                {cv.experience && <p>Years Of Experience: <span>{cv.experience}</span></p>
                                                }
                                                {cv.availability && <p>Availability: <span>{cv.availability}</span></p>
                                                }
                                                {cv.state && <p>State: <span>{cv.state}</span></p>
                                                }
                                                {cv.phone && <p>Phone: <span>{cv.phone}</span></p>
                                                }
                                            </div>
                                        </div>


                                    </div>
                                ) : <h2 className="text-dark text-center">No Cv Found</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default CvDetail;