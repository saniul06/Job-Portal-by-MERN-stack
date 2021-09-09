import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { countries } from 'countries-list'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import MetaData from '../Layout/MetaData'
import { Form } from 'react-bootstrap'
import { getAllCategoriesAndSubCategories, registerEmployee } from '../../actions/authActions'
import { REGISTER_EMPLOYEE_RESET } from '../../actions/actionTypes'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: '10px'
	},
}));

const RegisterEmployee = ({ history }) => {

	const classes = useStyles();

	const dispatch = useDispatch();
	const alert = useAlert();
	const firstMount = useRef(true)

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		phone: '',
		category: '',
		subcategory: '',
		country: '',
		state: '',
		experience: '',
		availability: ''
	});

	const {
		name,
		email,
		password,
		confirmPassword,
		phone,
		category,
		subcategory,
		country,
		state,
		experience,
		availability
	} = user;

	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState(
		'/images/default_avatar.jpg'
	);
	const [video, setVideo] = useState();

	let [subCategories, setSubCategories] = useState()

	let [mediaError, setMediaError] = useState({})

	const countriesList = Object.values(countries);

	const { allCategoriesAndSubCategories } = useSelector(state => state.allCategoriesAndSubCategories)
	const { loading, message, error } = useSelector(state => state.registerEmployee)

	useEffect(() => {
		dispatch(getAllCategoriesAndSubCategories())
	}, [])

	useEffect(() => {
		if (firstMount.current) {
			firstMount.current = false
			return
		}
		if (message) {
			alert.success(message)
		}
		if (error) {
			if (error === "Internal server error")
				alert.error(error)
			else
				alert.error("Please fill all required fields")

		}
	}, [alert, dispatch, message, error])

	const handleChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					if (reader.result.split('/')[0] === 'data:image') {
						setAvatarPreview(reader.result);
						setMediaError(prev => ({ ...prev, avatar: null }))
					} else {
						setAvatarPreview('/images/default_avatar.jpg')
						setMediaError(prev => ({ ...prev, avatar: "Please upload an image file" }))

					}
					setAvatar(e.target.files[0]);
				}
			};
			if (e.target.files[0]) {
				reader.readAsDataURL(e.target.files[0]);
			}
		} else if (e.target.name === 'video') {
			if (e.target.files[0]) {
				if (e.target.files[0].type.split('/')[0] === 'video') {
					setMediaError(prev => ({ ...prev, video: null }))

				} else {
					setMediaError(prev => ({ ...prev, video: "Please upload an video file" }))
				}
			}

			setVideo(e.target.files[0])
		}

		else if (e.target.name === 'category') {
			const selectedCategory = allCategoriesAndSubCategories.find(category =>
				category._id === e.target.value
			)

			setUser(prev => ({
				...prev, [e.target.name]: selectedCategory.name
			}))

			setSubCategories(allCategoriesAndSubCategories && allCategoriesAndSubCategories.filter(category => category.parentId === e.target.value))
		}

		else {
			setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
		}

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: REGISTER_EMPLOYEE_RESET })
		setMediaError({})
		const formData = new FormData();
		formData.set('name', name);
		formData.set('email', email);
		formData.set('password', password);
		formData.set('confirmPassword', confirmPassword);
		formData.set('avatar', avatar);
		formData.set('category', category);
		formData.set('subcategory', subcategory);
		formData.set('country', country);
		formData.set('video', video);
		formData.set('role', 'employee');
		formData.set('phone', phone);
		formData.set('state', state);
		formData.set('experience', experience);
		formData.set('availability', availability);
		dispatch(registerEmployee(formData, history))
	};

	return (
		<>
			<MetaData title='Employee-register' />
			<div className="page-wraper" style={{ pointerEvents: loading ? 'none' : '' }}>
				<Header />
				<div className="page-content">
					<div className="section-full content-inner browse-job shop-account bg-cv1">
						<div className="container">
							<div className="row">
								<div className="col-md-12 m-b30">
									<div className="p-a30 job-bx max-w700 radius-sm m-auto bg-grey">
										<div className="tab-content">
											<form
												id="login"
												className="tab-pane active"
												onSubmit={handleSubmit}
												encType="multipart/form-data">
												<h4 className="font-weight-700 m-b5 text-dark">
													Create account
												</h4>
												<p className="font-weight-600 text-dark">
													If you have an account with us,
													please log in.
												</p>
												<p className="font-weight-bold text-danger" style={{ fontSize: '17px' }}>
													Fields marked with * are required
												</p>
												<div className="row">
													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label className="font-weight-700">
																Name <span className='text-danger'>*</span>
															</label>
															<input
																name="dzName"
																required=""
																className="form-control"
																placeholder="Enter your name"
																type="text"
																name="name"
																value={name}
																onChange={handleChange}
																required
															/>

															{error && error.name && <p className='text-danger mt-2'>{error.name}</p>}
														</div>
													</div>
													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label className="font-weight-700">
																E-MAIL <span className='text-danger'>*</span>
															</label>
															<input
																name="email"
																value={email}
																onChange={handleChange}
																required=""
																className="form-control"
																placeholder="Enter your email"
																type="email"
																required
															/>

															{error && error.email && <p className='text-danger mt-2'>{error.email}</p>}
														</div>
													</div>
													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label className="font-weight-700">
																Password *
															</label>
															<input
																name="password"
																value={password}
																onChange={handleChange}
																required=""
																className="form-control "
																placeholder="Type Password"
																type="password"
																required
															/>

															{error && error.password && <p className='text-danger mt-2'>{error.password}</p>}
														</div>
													</div>
													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label className="font-weight-700">
																Confirm Password <span className='text-danger'>*</span>
															</label>
															<input
																name="confirmPassword"
																value={confirmPassword}
																onChange={handleChange}
																required=""
																className="form-control "
																placeholder="Confirm Password"
																type="password"
																required
															/>

															{error && error.confirmPassword && <p className='text-danger mt-2'>{error.confirmPassword}</p>}
														</div>
													</div>

													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label htmlFor="country_field">
																Country <span className='text-danger'>*</span>
															</label>
															<select
																id="country_field"
																className="form-control"
																value={country}
																name="country"
																onChange={handleChange}
																required>
																<option value="">--- Select ---</option>
																{countriesList.map(
																	(country) => (
																		<option
																			key={
																				country.name
																			}>
																			{country.name}
																		</option>
																	)
																)}
															</select>

															{error && error.country && <p className='text-danger mt-2'>{error.country}</p>}
														</div>
													</div>

													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label>Category <span className='text-danger'>*</span></label>
															<Form.Control as="select" custom className="custom-select" name='category' onChange={handleChange} required>
																<option value="">--- Select ---</option>
																{allCategoriesAndSubCategories && allCategoriesAndSubCategories.map(cat => (
																	cat.parentId === null && <option key={cat._id} value={cat._id}>{cat.name}</option>
																))}
															</Form.Control>

															{error && error.category && <p className='text-danger mt-2'>{error.category}</p>}
														</div>
													</div>

													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label>Sub category <span className='text-danger'>*</span></label>
															<Form.Control as="select" custom className="custom-select" name='subcategory' onChange={handleChange} required>
																<option value="">--- Select ---</option>
																{subCategories && subCategories.map(cat => (
																	<option key={cat._id} value={cat.name}>{cat.name}</option>
																))}
															</Form.Control>

															{error && error.subcategory && <p className='text-danger mt-2'>{error.subcategory}</p>}
														</div>
													</div>


													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label>Years of experience</label>
															<Form.Control as="select" custom className="custom-select" name='experience' onChange={handleChange}>
																<option value="">--- Select ---</option>
																<option value={1}>1</option>
																<option value={2}>2</option>
																<option value={3}>3</option>
																<option value={4}>4</option>
																<option value={5}>5</option>
																<option value={6}>6</option>
																<option value={7}>7</option>
																<option value={8}>8</option>
																<option value={9}>9</option>
																<option value={10}>10+</option>
															</Form.Control>
														</div>
													</div>

													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label>Availability</label>
															<Form.Control as="select" custom className="custom-select" name='availability' onChange={handleChange}>
																<option value="">--- Select ---</option>
																<option>Full time</option>
																<option>Part time</option>
																<option>Hourly</option>
															</Form.Control>
														</div>
													</div>

													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label className="font-weight-700">
																State{' '}
															</label>
															<input
																name="state"
																value={state}
																onChange={handleChange}
																required=""
																className="form-control"
																placeholder="Enter your state"
																type="text"
																onChange={handleChange}
															/>
														</div>
													</div>


													<div className="col-lg-6 col-md-6">
														<div className="form-group">
															<label className="font-weight-700">
																Phone{' '}
															</label>
															<input
																name="phone"
																value={phone}
																onChange={handleChange}
																required=""
																className="form-control"
																placeholder="Enter your phone"
																type="text"
																onChange={handleChange}
															/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<label htmlFor="avatar_upload">
														Avatar
													</label>
													<div className="d-flex align-items-center">
														<div>
															<figure className="avatar mr-3 item-rtl">
																<img
																	src={
																		avatarPreview
																	}
																	className="rounded-circle"
																	alt="avatar preview"
																	width={70}
																	height={70}
																/>
															</figure>
														</div>
														<div className="custom-file">
															<input
																type="file"
																name="avatar"
																className="custom-file-input"
																id="customFile"
																accept="images/<span className='text-danger'>*</span>"
																onChange={
																	handleChange
																}
															/>
															<label
																className="custom-file-label text-left"
																htmlFor="customFile">
																Choose Avatar
															</label>
														</div>

													</div>
													{error && error.avatar && <p className='text-danger mt-2'>{error.avatar}</p>}
													{mediaError.avatar && <p className='text-danger mt-2'>{mediaError.avatar}</p>}
												</div>

												<div className="form-group">
													<label htmlFor="avatar_upload">
														Video <span className='text-danger'>*</span > <span className='text-danger font-weight-bold'>(video duration must not exceed 1 minute)</span>
													</label>
													<div className="custom-file">
														<input
															type="file"
															name="video"
															className="custom-file-input"
															id="customFile"
															onChange={
																handleChange
															}
															required
														/>
														<label
															className="custom-file-label text-left"
															htmlFor="customFile">
															{(video && `${video.name.slice(0, 35)} ...`) || 'Choose video'}
														</label>


													</div>
													{error && error.video && <p className='text-danger mt-2'>{error.video}</p>}
													{mediaError.video && <p className='text-danger mt-2'>{mediaError.video}</p>}
												</div>

												<div className="text-left">
													<button
														type="submit"
														disabled={loading || mediaError.avatar || mediaError.video ? true : false}
														className="site-button"
														style={{ opacity: loading || mediaError.avatar || mediaError.video ? '0.7' : '1', width: '100%' }}
													>
														{loading ? <>Please wait. It might take few minutes ... </> : 'CREATE'}


													</button>
												</div>
												{loading &&
													<div className={classes.root}>
														<LinearProgress />
													</div>}


											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</div>

		</>
	);
};
export default RegisterEmployee;
