import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { verifyEmail, getUser, resendVerificationEmail } from '../../actions/authActions'
import { VERIFY_EMAIL_RESET, RESEND_VERIFY_EMAIL_RESET } from '../../actions/actionTypes'

var bnr = require('./../../images/banner/bnr2.jpg');

const VerifyEmail = ({ history, match, location }) => {

    const dispatch = useDispatch()

    const [verificationCode, setVerificationCode] = useState()

    const { loading, message, error } = useSelector(state => state.verifyEmail)

    const { loading: getUserLoading, error: getUserError, user, message: getUserByEmailMessage } = useSelector(state => state.getUser)

    const { isAuthenticated } = useSelector(state => state.auth)

    const {
        loading: resendEmailLoading,
        error: resendEmailError,
        message: resendEmailMessage
    } = useSelector(state => state.resendVerifyEmail)

    console.log('getUserError: ', getUserError)

    useEffect(() => {
        dispatch({ type: VERIFY_EMAIL_RESET })
        dispatch(getUser(match.params.id))
    }, [])

    useEffect(() => {
        // !location.state.from is used here for not going to login page for reset password
        if (location.state && location.state.from) {
            return
        }

        if (user && user.isVerified) {
            history.push('/login')
        }
    }, [user, location])

    useEffect(() => {
        if (getUserError) {
            history.push('/not-found')
        }
    }, [history, getUserError])

    const handleChange = e => {
        setVerificationCode(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: VERIFY_EMAIL_RESET })
        dispatch({ type: RESEND_VERIFY_EMAIL_RESET })
        dispatch(verifyEmail(verificationCode, history, match.params.id))
    }

    const sendEmail = () => {
        dispatch({ type: VERIFY_EMAIL_RESET })
        dispatch({ type: RESEND_VERIFY_EMAIL_RESET })
        dispatch(resendVerificationEmail(match.params.id))
    }

    return (
        <div className="page-wraper" style={{ pointerEvents: loading || getUserLoading || resendEmailLoading ? 'none' : '' }}>
            <Header />

            <div className="page-content">

                <div className="section-full content-inner-2 shop-account bg-cv1">

                    <div className="container">
                        <div className="m-auto max-w800 bg-grey m-b30">
                            <div className="p-a30 job-bx browse-job radius-sm seth">
                                <div className="tab-content nav">
                                    <form id="login" className="tab-pane active col-12 p-a0 " onSubmit={handleSubmit}>
                                        <h4 className="font-weight-700 text-center mb-4 text-dark">Verify your email</h4>
                                        <h5 className='text-success'>{!localStorage.getItem('forgotPassword') && 'Profile created successfully. '}A verification code is sent to your email. Please verify your email</h5>
                                        {error && <h6 className='text-danger'>{error}</h6>}
                                        {resendEmailError && <h6 className='text-danger'>{resendEmailError}</h6>}
                                        {message && <h6 className='text-success'>{message}</h6>}
                                        {resendEmailMessage && <h6 className='text-success'>{resendEmailMessage}</h6>}

                                        <div className="form-group">
                                            <label className="font-weight-700">Enter verification code</label>
                                            <input name="verificationCode" required="" className="form-control" placeholder="Enter verification code" type="text" value={verificationCode} onChange={handleChange} />
                                        </div>

                                        <div className="text-left">

                                            <button className="site-button button-lg" disabled={loading ? true : false}>Submit</button>
                                            <p onClick={sendEmail} className="site-button pull-right button-lg">Resend Email</p>
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
    )
}

export default VerifyEmail;