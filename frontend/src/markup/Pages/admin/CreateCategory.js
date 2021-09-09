import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import { createCategory } from '../../../actions/adminActions'
import { CLEAR_CATEGORY } from '../../../actions/actionTypes'

const CreateCategory = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, message, error } = useSelector(state => state.newCategory)

    const [name, setName] = useState()

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: CLEAR_CATEGORY })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: CLEAR_CATEGORY })
        }
    }, [alert, dispatch, message, error])

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData()

        dispatch(createCategory({ name }))
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
                                <ProfileSidebarAdmin createCategory='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx submit-resume">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">Create Category</h5>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row m-b30">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label>Category Name</label>
                                                        <input type="text" className="form-control" placeholder="Enter Category Name" onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="site-button m-b30">Create</button>
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
export default CreateCategory;