import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import { registerAdmin } from '../../../actions/adminActions'
import { REGISTER_ADMIN_RESET } from '../../../actions/actionTypes'

const RegisterAdmin = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, message, error } = useSelector(state => state.registerAdmin)

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (message) {
            alert.success(message)
            dispatch({ type: REGISTER_ADMIN_RESET })
        }

    }, [message])

    const handleChange = e => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch({ type: REGISTER_ADMIN_RESET })
        const formData = new FormData()
        formData.set('name', user.name)
        formData.set('email', user.email)
        formData.set('password', user.password)
        formData.set('confirmPassword', user.confirmPassword)
        dispatch(registerAdmin(formData))
    }

    return (
        <>
            <MetaData title='Register-Admin' />
            <div className="page-wraper" style={{ pointerEvents: loading ? 'none' : '' }}>

                < Header />

                <div className="page-content bg-white">
                    <div className="content-block">
                        <div className="section-full bg-white browse-job p-t50 p-b20">
                            <div className="container">
                                <div className="row">
                                    <ProfileSidebarAdmin adminRegister='active' />
                                    <div className="col-xl-9 col-lg-8 m-b30">
                                        <div className="job-bx job-profile">
                                            <div className="job-bx-title clearfix">
                                                <h5 className="font-weight-700 pull-left text-uppercase text-dark">Create Admin</h5>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row m-b10">
                                                    <div className="form-group">
                                                        <label>Name:</label>
                                                        <input type="text" required className="form-control" value={user.name} onChange={handleChange} name='name' />
                                                        {error && error.name && <p className='text-danger mt-2'>{error.name}</p>}
                                                    </div>

                                                </div>
                                                <div className="row m-10">
                                                    <div className="form-group">
                                                        <label>Email:</label>
                                                        <input type="email" required className="form-control" value={user.email} onChange={handleChange} name='email' />
                                                        {error && error.email && <p className='text-danger mt-2'>{error.email}</p>}
                                                    </div>
                                                </div>
                                                <div className="row m-10">
                                                    <div className="form-group">
                                                        <label>Password:</label>
                                                        <input type="password" required className="form-control" value={user.password} onChange={handleChange} name='password' />
                                                        {error && error.password && <p className='text-danger mt-2'>{error.password}</p>}
                                                    </div>
                                                </div>
                                                <div className="row m-10">
                                                    <div className="form-group">
                                                        <label>Confirm Password:</label>
                                                        <input type="password" required className="form-control" value={user.confirmPassword} onChange={handleChange} name='confirmPassword' />
                                                        {error && error.confirmPassword && <p className='text-danger mt-2'>{error.confirmPassword}</p>}
                                                    </div>
                                                </div>
                                                <button disabled={loading ? true : false} className="site-button m-b30" style={{ opacity: loading ? '.5' : '1' }}>{loading ? "Please wait ..." : "Update"}</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >

        </>
    )
}
export default RegisterAdmin;