import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { login } from '../../actions/authActions';
import { AUTH_RESET } from '../../actions/actionTypes';
import { logout } from '../../actions/authActions';
import { LOGOUT_RESET } from '../../actions/actionTypes';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

var bnr3 = require('./../../images/background/bg3.jpg');

const Header = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const history = useHistory()

	const [userData, setUserData] = useState({ email: '', password: '' });
	const { loading, isAuthenticated, error, user, logoutError } = useSelector(
		(state) => state.auth
	);
	const { success } = useSelector((state) => state.verifyEmail);

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
	};

	useEffect(() => {
		if (!success && user && !user.isVerified) {
			return history.push(`/verify/email/${user._id}`);
		}

		if (isAuthenticated) {
			setShow(false)
		}

		if (error === 'Verify your email') {
			history.push(`/verify/email/${localStorage.getItem('userId')}`)
		}

	}, [success, user, isAuthenticated, error]);

	useEffect(() => {
		if (logoutError) {
			alert.error(logoutError);
			dispatch({ type: LOGOUT_RESET });
		}
	}, [logoutError, error]);

	useEffect(() => {
		// sidebar open/close
		dispatch({ type: AUTH_RESET })
		var btn = document.querySelector('.navicon');
		var aaa = document.querySelector('.myNavbar ');

		function toggleFunc() {
			return aaa.classList.toggle('show');
		}

		btn.addEventListener('click', toggleFunc);

		// Sidenav li open close
		var navUl = [].slice.call(
			document.querySelectorAll('.navbar-nav > li')
		);
		for (var y = 0; y < navUl.length; y++) {
			navUl[y].addEventListener('click', function () {
				checkLi(this);
			});
		}

		function checkLi(current) {
			navUl.forEach((el) => el.classList.remove('open'));
			current.classList.add('open');
		}
	}, []);

	const handleChange = (e) => {
		setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmitHeader = (e) => {
		e.preventDefault();
		dispatch(login({ email: userData.email, password: userData.password }, history));
		dispatch({ type: AUTH_RESET });
	};

	const handleLogout = () => {
		dispatch(logout(history));
	};
	return (
		<>
			<header className="site-header mo-left header fullwidth">
				<div className="sticky-header main-bar-wraper navbar-expand-lg">
					<div className="main-bar clearfix">
						<div className="container clearfix">
							<div className="logo-header mostion">
								<Link to="/">
									<img
										src={require('./../../images/logo.jpeg')}
										className="logo"
										alt="CVid"
									/>
								</Link>
							</div>

							<button
								className="navbar-toggler collapsed navicon justify-content-end"
								type="button"
								data-toggle="collapse"
								data-target="#navbarNavDropdown"
								aria-controls="navbarNavDropdown"
								aria-expanded="false"
								aria-label="Toggle navigation">
								<span></span>
								<span></span>
								<span></span>
							</button>

							<div className="extra-nav">
								<div className="extra-cell">
									{loading ? <CircularProgress style={{ color: '#000' }} /> : !isAuthenticated ? (
										<>
											<Link
												to={'/register-selection'}
												className="site-button">
												<i className="fa fa-user"></i>{' '}
												Sign Up
											</Link>
											<Link
												to={'#'}
												title="READ MORE"
												onClick={handleShow}
												className="site-button">
												<i className="fa fa-lock"></i> login{' '}
											</Link>

										</>
									) : (
										<Link
											to={'#'}
											title="READ MORE"
											onClick={handleLogout}
											className="site-button">
											<i className="fa fa-lock"></i>{' '}
											logout{' '}
										</Link>
									)}

								</div>
							</div>

							<div
								className="header-nav navbar-collapse collapse myNavbar justify-content-start"
								id="navbarNavDropdown">
								<ul className="nav navbar-nav">
									<li><Link to='/'>Home 1</Link></li>
									{user && (user.role === 'employee') &&
										<li><Link to={'#'}>For Candidates{' '}<i className="fa fa-chevron-down"></i></Link>
											<ul className="sub-menu">
												<li>
													<Link to={'/employee/profile'} className="dez-page">
														My Profile
													</Link>
												</li>
												<li>
													<Link to={'/employee/my-resume'} className="dez-page">
														My Resume{' '}
													</Link>
												</li>
												<li>
													<Link to={'/employee/jobs-applied-job'} className="dez-page">
														Applied Job{' '}
													</Link>
												</li>
												<li>
													<Link to={'/employee/jobs-alerts'} className="dez-page">
														Jobs Alerts{' '}
													</Link>
												</li>
												<li>
													<Link
														to={'/employee/jobs-saved-jobs'} className="dez-page">
														Saved Job{' '}
													</Link>
												</li>
												<li>
													<Link to={'/employee/cv-manager'} className="dez-page">
														CV Manager{' '}
													</Link>
												</li>
												<li>
													<Link
														to={'/employee/change-password'} className="dez-page">
														Change Password{' '}
													</Link>
												</li>
											</ul>
										</li>
									}
									{user && user.role === 'employer' &&
										<li>
											<Link to={'#'}>
												For Employers{' '}
												<i className="fa fa-chevron-down"></i>
											</Link>
											<ul className="sub-menu">
												<li>
													<Link to={'/employer/profile'} className="dez-page">
														My Profile{' '}
													</Link>
												</li>
												<li>
													<Link to={'/employer/change-password'} className="dez-page">
														Change Password{' '}
													</Link>
												</li>
												<li>
													<Link to={'/employer/cv/favorite'} className="dez-page">
														Favorite Cv's{' '}
													</Link>
												</li>
												<li>
													<Link to={'/company-resume'} className="dez-page">
														Employer Resume{' '}
													</Link>
												</li>
												<li>
													<Link to={'/company-post-jobs'} className="dez-page">
														Post A Jobs{' '}
													</Link>
												</li>
												<li>
													<Link to={'/company-manage-job'} className="dez-page">
														Manage jobs{' '}
													</Link>
												</li>
												<li>
													<Link to={'/company-transactions'} className="dez-page">
														Transactions{' '}
													</Link>
												</li>
												<li>
													<Link to={'/browse-candidates'} className="dez-page">
														Browse Candidates
													</Link>
												</li>
											</ul>
										</li>
									}
									<li>
										<Link
											to={'/browse-cv'} className="dez-page">
											browse Cv{' '}
										</Link>
									</li>
									{user && user.role === 'admin' &&
										<li>
											<Link to={'#'}>
												For admins{' '}
												<i className="fa fa-chevron-down"></i>
											</Link>
											<ul className="sub-menu">
												<li>
													<Link to={'/admin/profile'} className="dez-page">
														My Profile{' '}
													</Link>
												</li>
												<li>
													<Link to={'/admin/change-password'} className="dez-page">
														Change Password{' '}
													</Link>
												</li>
												<li>
													<Link to={'/admin/register-admin'} className="dez-page">
														Create Admin{' '}
													</Link>
												</li>
												<li>
													<Link to={'#'} className="dez-page">
														Cv's
														<i className="fa fa-angle-right"></i>
													</Link>
													<ul className="sub-menu">
														<li>
															<Link to={'/admin/cv/verified'} className="dez-page">
																Verified Cv's{' '}
															</Link>
														</li>
													</ul>
												</li>
												<li>
													<Link to={'#'} className="dez-page">
														User's
														<i className="fa fa-angle-right"></i>
													</Link>
													<ul className="sub-menu">
														<li>
															<Link to={'/admin/users/verified'} className="dez-page">
																Verified User's{' '}
															</Link>
														</li>
														<li>
															<Link to={'/admin/users/unverified'} className="dez-page">
																Unverified User's{' '}
															</Link>
														</li>
													</ul>
												</li>
												<li>
													<Link to={'#'} className="dez-page">
														Category
														<i className="fa fa-angle-right"></i>
													</Link>
													<ul className="sub-menu">
														<li>
															<Link to={'/admin/create-category'} className="dez-page">
																Create category{' '}
															</Link>
														</li>
														<li>
															<Link
																to={'/admin/create-sub-category'} className="dez-page">
																Create sub-category{' '}
															</Link>
														</li>
														<li>
															<Link
																to={'/admin/delete-category'} className="dez-page">
																delete category{' '}
															</Link>
														</li>
														<li>
															<Link
																to={'/admin/delete-subcategory'} className="dez-page">
																Delete sub-category{' '}
															</Link>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									}
									<li>
										<Link to={'#'}>
											Pages{' '}
											<i className="fa fa-chevron-down"></i>
										</Link>
										<ul className="sub-menu">
											<li>
												<Link to={'/about-us'} className="dez-page">
													About Us
												</Link>
											</li>
											<li>
												<Link to={'/job-detail'} className="dez-page">
													Job Detail
												</Link>
											</li>
											<li>
												<Link to={'/companies'} className="dez-page">
													companies
												</Link>
											</li>
											<li>
												<Link to={'/free-job-alerts'} className="dez-page">
													free job alerts{' '}
												</Link>
											</li>
											<li>
												<Link to={'/#'} className="dez-page">
													Browse Job{' '}
													<i className="fa fa-angle-right"></i>
												</Link>
												<ul className="sub-menu">
													<li>
														<Link
															to={'/browse-job-list'} className="dez-page">
															browse job list
														</Link>
													</li>
													<li>
														<Link
															to={'/browse-cv'} className="dez-page">
															browse job grid{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/browse-job-filter-list'} className="dez-page">
															browse filter list{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/browse-job-filter-grid'} className="dez-page">
															browse filter grid{' '}
														</Link>
													</li>
												</ul>
											</li>
											<li>
												<Link to={'#'} className="dez-page">
													Jobs
													<i className="fa fa-angle-right"></i>
												</Link>
												<ul className="sub-menu">
													<li>
														<Link
															to={'/category-all-jobs'} className="dez-page">
															all jobs{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/category-company-jobs'} className="dez-page">
															company jobs{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/category-designations-jobs'} className="dez-page">
															designations jobs{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/category-jobs'} className="dez-page">
															category jobs{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/category-location-jobs'} className="dez-page">
															location jobs{' '}
														</Link>
													</li>
													<li>
														<Link
															to={'/category-skill-jobs'} className="dez-page">
															skill jobs{' '}
														</Link>
													</li>
												</ul>
											</li>
											<li>
												<Link to={'#'} className="dez-page">
													Portfolio{' '}
													<i className="fa fa-angle-right"></i>
												</Link>
												<ul className="sub-menu">
													<li>
														<Link to={'/portfolio-grid-2'}
															className="dez-page">
															Portfolio Grid 2{' '}
														</Link>
													</li>
												</ul>
											</li>
											<li>
												<Link to={'#'} className="dez-page">
													Login{' '}
													<i className="fa fa-angle-right"></i>
												</Link>
												<ul className="sub-menu">
													<li>
														<Link to={'/login'} className="dez-page">
															login 1
														</Link>
													</li>
													<li>
														<Link to={'/login-2'} className="dez-page">
															login 2{' '}
														</Link>
													</li>
												</ul>
											</li>
											<li>
												<Link to={'#'} className="dez-page">
													register{' '}
													<i className="fa fa-angle-right"></i>
												</Link>
												<ul className="sub-menu">
													<li>
														<Link to={'register'} className="dez-page">
															register 1
														</Link>
													</li>
													<li>
														<Link to={'register-2'} className="dez-page">
															register 2{' '}
														</Link>
													</li>
												</ul>
											</li>
											<li>
												<Link to={'/error-404'} className="dez-page">
													Error 404
												</Link>
											</li>
											<li>
												<Link to={'/contact'} className="dez-page">
													Contact Us
												</Link>
											</li>
										</ul>
									</li>
									<li>
										<Link to={'#'}>
											Blog{' '}
											<i className="fa fa-chevron-down"></i>
										</Link>
										<ul className="sub-menu">
											<li>
												<Link to={'/blog-classic'} className="dez-page">
													Classic
												</Link>
											</li>
											<li>
												<Link to={'/blog-classic-sidebar'} className="dez-page">
													Classic Sidebar
												</Link>
											</li>
											<li>
												<Link to={'/blog-detailed-grid'} className="dez-page">
													Detailed Grid
												</Link>
											</li>
											<li>
												<Link
													to={'/blog-detailed-grid-sidebar'} className="dez-page">
													Detailed Grid Sidebar
												</Link>
											</li>
											<li>
												<Link to={'/blog-left-img'} className="dez-page">
													Left Image Sidebar
												</Link>
											</li>
											<li>
												<Link to={'/blog-details'} className="dez-page">
													Blog Details
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/*  Model Start */}
			<Modal
				show={show}
				onHide={handleClose}
				className=" lead-form-modal"
				centered>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<button
							type="button"
							className="close"
							onClick={handleClose}>
							<span aria-hidden="true">&times;</span>
						</button>
						<div className="modal-body row m-a0 clearfix">
							<div className="col-lg-12 col-md-12 p-a0">
								<div className="lead-form browse-job text-left">
									<form onSubmit={handleSubmitHeader}>
										{error && (
											<p className="font-weight-bold text-danger">
												{error}
											</p>
										)}
										<h3 className="m-t0 text-dark">
											Log in
										</h3>

										<div className="form-group">
											<input
												name="email"
												required
												className="form-control"
												placeholder="Your Email Address"
												type="email"
												value={userData.email}
												onChange={handleChange}
											/>
										</div>
										<div className="form-group">
											<input
												name="password"
												required
												className="form-control "
												placeholder="Type Password"
												type="password"
												value={userData.password}
												onChange={handleChange}
											/>
										</div>
										<div className="clearfix">
											<button className="site-button m-r5">
												login
											</button>
											<Link
												data-toggle="tab"
												to="/forgot/password"
												className="m-l5 m-t15 forget-pass float-right text-dark">
												<i className="fa fa-unlock-alt"></i>{' '}
												Forgot Password
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
			{/*  Model END */}
		</>
	);
};

export default Header;
