import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import CvUpdate from '../../Element/CvUpdate'
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import { createCategory } from '../../../actions/adminActions'
import { CLEAR_CATEGORY } from '../../../actions/actionTypes'

const EmployeeUpdate = ({ match }) => {

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
                                <ProfileSidebarAdmin />
                                <CvUpdate match={match} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default EmployeeUpdate;