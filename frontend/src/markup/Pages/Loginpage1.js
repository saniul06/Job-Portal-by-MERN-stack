import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import MetaData from './../Layout/MetaData'
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { login } from '../../actions/authActions'
import { AUTH_RESET } from '../../actions/actionTypes'

var bnr = require('./../../images/banner/bnr2.jpg');

const Loginpage1 = ({ history }) => {
	const dispatch = useDispatch()
	const alert = useAlert()

	const { message } = useSelector(state => state.verifyEmail)
	const [userData, setUserData] = useState({ email: '', password: '' })
	const { loading, isAuthenticated, error, user } = useSelector(state => state.auth)
	const { success } = useSelector(state => state.verifyEmail)
	const { message: passwordResetMessage } = useSelector(state => state.resetPassword)

	useEffect(() => {
		if (!success && user && !user.isVerified) {
			console.log('here firsttttttttttttttttttttttttttttt')
			return history.push(`/verify/email/${user._id}`)
		}

		if (error === 'Verify your email') {
			console.log('here seconddddddddddddddddddddddddddddddddddd')
			history.push(`/verify/email/${localStorage.getItem('userId')}`)
		}
	}, [success, user, error])

	const handleChange = e => {
		setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(login({ email: userData.email, password: userData.password }, history))
		dispatch({ type: AUTH_RESET })
	}

	return (
		<div className="page-wraper">
			<Header />

			<div className="page-content">
				<div className="section-full content-inner-2 shop-account bg-cv1">
					<div className="container">
						<div className="max-w500 m-auto bg-white m-b30">
							<div className="p-a30 job-bx browse-job radius-sm seth bg-grey">
								<div className="tab-content nav">
									<form id="login" className="tab-pane active col-12 p-a0 " onSubmit={handleSubmit}>
										{message && <h4 className="font-weight-700 text-success mb-4">{message}</h4>}
										{passwordResetMessage && <h4 className="font-weight-700 text-success mb-4">{passwordResetMessage}</h4>}
										<h4 className="font-weight-700 text-dark">LOGIN</h4>
										{error && <p className="font-weight-bold text-danger">{error}</p>}
										<div className="form-group">
											<label className="font-weight-700 text-dark">E-MAIL *</label>
											<input name="email" required className="form-control" placeholder="Your Email Address" type="email" value={userData.email} onChange={handleChange} />
										</div>
										<div className="form-group">
											<label className="font-weight-700 text-dark">PASSWORD *</label>
											<input name="password" required className="form-control " placeholder="Type Password" type="password" value={userData.password} onChange={handleChange} />
										</div>
										<div className="text-left">
											<button className="site-button m-r5 button-lg">login</button>
											<Link to='/forgot/password' data-toggle="tab" className="m-l5 m-t15 forget-pass float-right text-dark"><i className="fa fa-unlock-alt"></i> Forgot Password</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
			<Footer />

		</div>
	)
}

export default Loginpage1;