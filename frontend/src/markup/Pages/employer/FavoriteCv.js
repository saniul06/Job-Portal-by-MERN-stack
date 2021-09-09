import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination';
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData';
import ProfileSidebarEmployer from '../../Element/ProfileSidebarEmployer';
import { getAllFavoriteCv, deleteFavoriteCv } from '../../../actions/employerActions'
import { FAVORITE_OR_UNFAVORITE_CV_RESET } from '../../../actions/actionTypes'

const FavoriteCv = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, favCvs, count, itemsPerPage, error } = useSelector(state => state.favCvs)
    const { message, error: favError } = useSelector(state => state.favoriteCv)

    const [currentPage, setCurrentPage] = useState(1)

    const [cvs, setCvs] = useState()

    useEffect(() => {
        dispatch(getAllFavoriteCv(currentPage))
    }, [currentPage])

    useEffect(() => {
        setCvs(favCvs)
    }, [favCvs])

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_RESET })
        }
        if (favError) {
            alert.error(favError)
            dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_RESET })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: FAVORITE_OR_UNFAVORITE_CV_RESET })
        }
    }, [message, error, favError])

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = cvId => {
        const formData = new FormData()
        formData.set('cvId', cvId)
        dispatch(deleteFavoriteCv(formData, setCvs, cvId))
    }

    return (
        <>
            <MetaData title={'Favorite-Cvs'} />
            <Header />
            <div className="page-content bg-white">

                <div className="content-block">
                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarEmployer favoriteCv='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx table-job-bx browse-job clearfix">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">Favorite Cv List</h5>
                                        </div>
                                        {cvs && cvs.length < 1 && <h3 className='text-dark'>No Favorite Cv Found</h3>}
                                        <table className='text-center'>
                                            <thead>
                                                <tr>
                                                    <th>Country</th>
                                                    <th>Category</th>
                                                    <th>Sub category</th>
                                                    <th style={{ textAlign: 'left' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            {loading ? <div className="center-progress"><CircularProgress style={{ color: '#000' }} /></div> :
                                                <tbody>
                                                    {cvs && cvs.map((cv, index) => (

                                                        <tr key={index}>
                                                            <td className="job-name"><Link to={"/job-detail"}>{cv.country}</Link></td>
                                                            <td className="criterias">{cv.category}</td>
                                                            <td className="date">{cv.subcategory}</td>
                                                            <td className="job-links">
                                                                <Link to={`/cv/${cv._id}`} data-toggle="modal" data-target="#exampleModalLong" onClick={handleShow}>
                                                                    <i className="fa fa-eye"></i></Link>
                                                                <Link to={"#"} onClick={() => handleDelete(cv._id)}><i className="ti-trash"></i></Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                            }
                                        </table>
                                        <div className="pagination-bx float-right">
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
                                    </div>

                                    <Modal show={show} onHide={handleClose} className="modal fade modal-bx-info" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Company Name</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul>
                                                        <li><strong>Job Title :</strong><p> Web Developer – PHP, HTML, CSS </p></li>
                                                        <li><strong>Experience :</strong><p>5 Year 3 Months</p></li>
                                                        <li><strong>Deseription :</strong>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since.</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
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
export default FavoriteCv;