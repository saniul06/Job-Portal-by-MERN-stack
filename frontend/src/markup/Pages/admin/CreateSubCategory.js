import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import { Form } from 'react-bootstrap';
import { createCategory, getCategories } from '../../../actions/adminActions'
import { CLEAR_CATEGORY } from '../../../actions/actionTypes'

const CreateSubCategory = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { message, error } = useSelector(state => state.newCategory)
    const { categories } = useSelector(state => state.allCategories)

    const [value, setValue] = useState({
        category: '',
        subcategory: ''
    })

    useEffect(() => {
        dispatch(getCategories())
    }, [])

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
        setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!value.category) {
            return alert.error('Please select a category')
        }

        if (!value.subcategory) {
            return alert.error('Please select a sub category')
        }

        const formData = new FormData
        formData.set('name', value.subcategory)
        formData.set('parentId', value.category)
        dispatch(createCategory(formData))
    }

    return (
        <>
            <MetaData title='create-subcategory' />
            <Header />
            <div className="page-content bg-white">

                <div className="content-block">

                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarAdmin createSubcategory='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx submit-resume">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">Create sub-category</h5>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row m-b30">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <label>Choose category</label>
                                                            <Form.Control as="select" custom className="custom-select" name='category' onChange={handleChange}>
                                                                <option value="">--- Select ---</option>
                                                                {categories && categories.map(cat => (
                                                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                                ))}


                                                            </Form.Control>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Category Name</label>
                                                        <input type="text" className="form-control" placeholder="Enter Company Name" name='subcategory' onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="site-button m-b30" >Create</button>
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
export default CreateSubCategory;