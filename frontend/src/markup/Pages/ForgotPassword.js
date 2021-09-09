import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import MetaData from '../Layout/MetaData'
import { getUserByEmail } from '../../actions/authActions'
import { GET_USER_BY_EMAIL_RESET } from '../../actions/actionTypes'

const ForgotPassword = ({ history }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState(null)

    const { loading, error, user } = useSelector(state => state.getUserByEmail)

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/login')
        }
    }, [isAuthenticated])

    const handleChange = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: GET_USER_BY_EMAIL_RESET })
        dispatch(getUserByEmail(email, history))
    }


    return (
        <>
            <MetaData title='Enter email' />
            <div className="page-wraper" >
                <Header />

                <div className="page-content">

                    <div className="section-full content-inner-2 shop-account bg-cv1">

                        <div className="container">
                            <div className="m-auto max-w500 bg-grey m-b30">
                                <div className="p-a30 job-bx browse-job radius-sm seth">
                                    <div className="tab-content nav">
                                        <form id="login" className="tab-pane active col-12 p-a0 " encType="multipart/form-data" onSubmit={handleSubmit}>
                                            <h4 className="font-weight-700 mb-4 text-dark">Enter your email</h4>
                                            {error && <h6 className='text-danger'>{error}</h6>}

                                            <div className="form-group">
                                                <input name="email" required className="form-control" placeholder="Enter your email" type="email" value={email} onChange={handleChange} />
                                            </div>

                                            <div className="text-left">

                                                <button className="site-button button-lg" disabled={loading ? true : false}>Submit</button>
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

export default ForgotPassword
