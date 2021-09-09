import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../Layout/MetaData'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { resetPassword, getUser } from '../../actions/authActions'
import { RESET_PASSWORD_RESET } from '../../actions/actionTypes'

const ResetPassword = ({ history, match }) => {

    const dispatch = useDispatch()

    const { loading, error } = useSelector(state => state.resetPassword)
    const { message } = useSelector(state => state.verifyEmail)
    const { loading: getUserLoading, error: getUserError, user, message: getUserByEmailMessage } = useSelector(state => state.getUser)

    const [password, setPassword] = useState({
        password: '',
        confirmPassword: '',
        error: ''
    })

    useEffect(() => {
        if (!localStorage.getItem('forgotPassword')) {
            history.push('/')
        }
        dispatch(getUser(match.params.id))
    }, [])

    useEffect(() => {
        if (getUserError) {
            history.push('/not-found')
        }
    }, [history, getUserError])

    useEffect(() => {
        if (!localStorage.getItem('forgotPassword')) {
            history.push('/')
        }
    })

    const handleChange = e => {
        setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        setPassword(prev => ({ ...prev, error: '' }))
        e.preventDefault()
        if (password.password !== password.confirmPassword) {
            setPassword(prev => ({ ...prev, error: 'password doesn"t match' }))
            return
        }
        dispatch(resetPassword(password, history))
        dispatch({ type: RESET_PASSWORD_RESET })
    }

    return (
        <>
            <MetaData title='/reset-password' />
            <div className="page-wraper" style={{ pointerEvents: loading ? 'none' : '' }}>
                <Header />

                <div className="page-content">

                    <div className="section-full content-inner-2 shop-account bg-cv1">

                        <div className="container">
                            <div className="m-auto max-w500 bg-grey m-b30">
                                <div className="p-a30 job-bx browse-job radius-sm seth">
                                    <div className="tab-content nav">
                                        <form id="login" className="tab-pane active col-12 p-a0 " onSubmit={handleSubmit}>
                                            <h4 className="font-weight-700 text-center mb-4 text-dark">Reset your password</h4>

                                            {message && <h6 className='text-success'>Verification successful. Reset your password</h6>}
                                            {error && <h6 className='text-danger'>{error}</h6>}
                                            {password.error && <h6 className='text-danger'>{password.error}</h6>}

                                            <div className="form-group">
                                                <label className="font-weight-700">Enter new password</label>
                                                <input name="password" required className="form-control" placeholder="Enter new password" type="password" value={password.password} onChange={handleChange} />

                                                <div className="form-group">
                                                    <label className="font-weight-700">Enter verification code</label>
                                                    <input name="confirmPassword" required="" className="form-control" placeholder="Enter password again" type="password" value={password.confirmPassword} onChange={handleChange} />
                                                </div>

                                                <div className="text-left">

                                                    <button className="site-button button-lg" disabled={loading ? true : false}>Reset password</button>
                                                </div>
                                            </div>

                                        </form>
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

export default ResetPassword
