import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import { Form } from 'react-bootstrap';
import { getCategories, deleteCategory } from '../../../actions/adminActions'
import { DELETE_CATEGORY_RESET } from '../../../actions/actionTypes'

const DeleteCategory = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { categories } = useSelector(state => state.allCategories)
    const { subcategories } = useSelector(state => state.allSubcategories)
    const { loading, message, error } = useSelector(state => state.deleteCategory)

    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(getCategories())
    }, [])
    console.log('category is:        ', category)
    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: DELETE_CATEGORY_RESET })
        }
        if (error) {
            alert.error(error)
            dispatch({ type: DELETE_CATEGORY_RESET })
        }
    }, [dispatch, alert, message, error])

    const handleChange = e => {
        setCategory(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(deleteCategory({ category }))
    }

    return (
        <>
            <MetaData title='delete-category' />
            <Header />
            <div className="page-content bg-white">

                <div className="content-block">

                    <div className="section-full bg-white p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarAdmin deleteCategory='active' />
                                <div className="col-xl-9 col-lg-8 m-b30">
                                    <div className="job-bx submit-resume">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase text-dark">Delete category</h5>
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
                                                                    <option key={cat._id} value={cat._name}>{cat.name}</option>
                                                                ))}
                                                            </Form.Control>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="site-button m-b30" >Delete</button>
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

export default DeleteCategory
