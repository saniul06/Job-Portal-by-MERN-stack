import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData';
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin';
import { getVerifiedUser, deleteUserAndCv } from '../../../actions/adminActions'
import { DELETE_CV_AND_EMPLOYEE_RESET } from '../../../actions/actionTypes'

const jobAlert = [
    { title: 'Social Media Expert', date: 'December 15,2018', },
    { title: 'Web Designer', date: 'November 10,2018', },
    { title: 'Finance Accountant', date: 'October 5,2018', },
    { title: 'Social Media Expert', date: 'December 15,2018', },
    { title: 'Web Designer', date: 'November 10,2018', },
    { title: 'Finance Accountant', date: 'October 5,2018', },
    { title: 'Social Media Expert', date: 'December 15,2018', },
    { title: 'Web Designer', date: 'November 10,2018', },
    { title: 'Finance Accountant', date: 'October 5,2018', },
    { title: 'Social Media Expert', date: 'December 15,2018', },
]

const VerifiedUser = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { user: currentUser } = useSelector(state => state.auth)
    const { loading, users, itemsPerPage, totalUser, count } = useSelector(state => state.AllUser)

    const {
        loading: cvStatusLoading,
        message: cvStatuseMessage,
        error: cvStatusError
    } = useSelector(state => state.cvStatus)

    const [currentPage, setCurrentPage] = useState(1)
    const [verifiedUsers, setVerifiedUsers] = useState()
    const [deleteProfileModal, setDeleteProfileModal] = useState(false)
    const [userId, setUserId] = useState()
    const [admin, setAdmin] = useState()
    const [employee, setEmployee] = useState()
    const [employer, setEmployer] = useState()
    const [getAll, setGetAll] = useState(true)

    useEffect(() => {
        dispatch(getVerifiedUser(currentPage, 1, admin, employee, employer, getAll))
    }, [currentPage, admin, employee, employer, getAll])

    useEffect(() => {
        setVerifiedUsers(users)
    }, [users, currentPage])

    useEffect(() => {
        if (cvStatuseMessage) {
            alert.success(cvStatuseMessage)
            dispatch({ type: DELETE_CV_AND_EMPLOYEE_RESET })
        }

        if (cvStatusError) {
            alert.error(cvStatusError)
            dispatch({ type: DELETE_CV_AND_EMPLOYEE_RESET })
        }
    }, [cvStatuseMessage, cvStatusError])

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteProfileModalShow = userId => {
        setUserId(userId)
        setDeleteProfileModal(true)
    }

    const deleteProfileModalClose = () => {
        setDeleteProfileModal(false)
        setUserId()
    }

    const handleDeleteProfileSubmit = () => {
        const formData = new FormData()
        formData.set('userId', userId)
        dispatch(deleteUserAndCv(formData, userId, setVerifiedUsers, 'verifiedUser'))
        setDeleteProfileModal(false)
        setUserId()
    }

    const handleSelect = e => {
        if (e.target.value === 'Admin') {
            setAdmin('admin')
            setEmployee('')
            setEmployer('')
            setGetAll(false)
        } else if (e.target.value === 'Employee') {
            setAdmin('')
            setEmployee('employee')
            setEmployer('')
            setGetAll(false)
        } else if (e.target.value === 'Employer') {
            setAdmin('')
            setEmployee('')
            setEmployer('employer')
            setGetAll(false)
        } else if (e.target.value === 'All') {
            setAdmin('')
            setEmployee('')
            setEmployer('')
            setGetAll(true)
        }
        setCurrentPage(1)
    }

    return (
        <>
            <MetaData title={'Verified-User'} />
            <Header />
            <div className="page-content bg-white">

                <div className="content-block">

                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarAdmin VerifiedUser='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx table-job-bx browse-job clearfix">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">Verified Users List</h5>
                                            <div className="float-right">
                                                <span className="select-title">Sort by Role</span>
                                                <select onChange={handleSelect} className="custom-btn">
                                                    <option>Select</option>
                                                    <option>All</option>
                                                    <option>Admin</option>
                                                    <option>Employee</option>
                                                    <option>Employer</option>
                                                </select>
                                            </div>
                                        </div>
                                        <table className='text-center'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Created At</th>
                                                    <th style={{ textAlign: 'left' }}>Delete</th>
                                                </tr>
                                            </thead>
                                            {loading ? <div className="center-progress"><CircularProgress style={{ color: '#000' }} /></div> : <tbody>
                                                {verifiedUsers && verifiedUsers.map((user, index) => (
                                                    <tr key={index}>
                                                        <td className="criterias">{user.name}</td>
                                                        <td className="criterias">{user.email}</td>
                                                        <td className="criterias">{user.role}</td>
                                                        <td className="date">{new Date(user.createdAt).toDateString()}</td>
                                                        <td className="job-links">
                                                            {user.email !== currentUser.email && <Button variant="outlined" size="small" color="dark" title='Delete User' data-toggle="modal" className='text-danger' data-target="#exampleModalLong" onClick={() => deleteProfileModalShow(user._id)}>
                                                                Delete
                                                            </Button>}
                                                        </td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                            }
                                        </table>
                                        {count > itemsPerPage && (
                                            <div className="pagination-bx float-right">
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
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Modal show={deleteProfileModal} onHide={deleteProfileModalClose} className="modal fade modal-bx-info" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">



                                    <div className="modal-dialog  m-0" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title text-danger">Delete Video From Server</h5>
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

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}
export default VerifiedUser;