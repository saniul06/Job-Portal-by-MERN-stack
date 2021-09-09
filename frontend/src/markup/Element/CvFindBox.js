import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { countries } from 'countries-list'
import { Form } from 'react-bootstrap';
import { getAllCategoriesAndSubCategories } from '../../actions/authActions'
import { getAllActivatedCv } from '../../actions/adminActions'

const initialState = {

	category: '',
	subcategory: '',
	country: '',
	experience: '',
	availability: ''
}

const Cvfindbox = ({ currentPage }) => {

	const countriesList = Object.values(countries);

	const dispatch = useDispatch()

	const [filters, setFilters] = useState(initialState);

	const {
		category,
		subcategory,
		country,
		experience,
		availability
	} = filters;

	let [subCategories, setSubCategories] = useState()

	const { allCategoriesAndSubCategories } = useSelector(state => state.allCategoriesAndSubCategories)

	useEffect(() => {
		dispatch(getAllActivatedCv(currentPage, category, subcategory, country, experience, availability))
	}, [currentPage])

	useEffect(() => {
		dispatch(getAllCategoriesAndSubCategories())
	}, [])

	const handleChange = (e) => {
		if (e.target.name === 'category') {
			const selectedCategory = allCategoriesAndSubCategories.find(category =>
				category._id === e.target.value
			)

			if (selectedCategory) {
				setFilters(prev => ({
					...prev, [e.target.name]: selectedCategory.name
				}))
			} else {
				setFilters(prev => ({
					...prev, category: ''
				}))
			}

			setSubCategories(allCategoriesAndSubCategories && allCategoriesAndSubCategories.filter(category => category.parentId === e.target.value))
		}

		else {
			setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
		}

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		console.log('category is: ', category, typeof (category))
		console.log('subcategory is: ', subcategory, typeof (subcategory))
		console.log('country is: ', country, typeof (country))
		console.log('experience is: ', experience, typeof (experience))
		console.log('availability is: ', availability, typeof (availability))
		formData.set('category', category);
		formData.set('subcategory', subcategory);
		formData.set('country', country);
		formData.set('experience', Number(experience));
		formData.set('availability', availability);
		dispatch(getAllActivatedCv(1, category, subcategory, country, experience, availability))
	};

	const handleClear = e => {
		setFilters(initialState)
		e.preventDefault()
		dispatch(getAllActivatedCv())
	}

	return (
		<div div className="section-full browse-job-find" >
			<div className="container">
				<div className="find-job-bx">

					<form className="dezPlaceAni">
						<div className="row">
							<div className="col-lg-4 col-md-6">
								<div className="form-group">
									<Form.Control as="select" onChange={handleChange} custom className="select-btn" name="country">
										<option value="">Country</option>
										{countriesList.map(
											(country) => (
												<option
													key={
														country.name
													}
												>
													{country.name}
												</option>
											)
										)}
									</Form.Control>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="form-group">
									<Form.Control as="select" custom className="select-btn" name='category' onChange={handleChange}>
										<option value="">category</option>
										{allCategoriesAndSubCategories && allCategoriesAndSubCategories.map(cat => (
											cat.parentId === null && <option key={cat._id} value={cat._id}>{cat.name}</option>
										))}
									</Form.Control>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="form-group">
									<Form.Control as="select" custom className="select-btn" name='subcategory' onChange={handleChange} >
										<option value="">Sub-category</option>
										{subCategories && subCategories.map(cat => (
											<option key={cat._id} value={cat.name}>{cat.name}</option>
										))}
									</Form.Control>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="form-group">
									<Form.Control as="select" custom className="select-btn" name='availability' onChange={handleChange}>
										<option value="">Availability</option>
										<option>Full time</option>
										<option>Part time</option>
										<option>Hourly</option>
									</Form.Control>
								</div>
							</div>
							<div className="col-lg-3 col-md-6">
								<div className="form-group">
									<Form.Control as="select" custom className="select-btn" name='experience' onChange={handleChange}>
										<option value="">Years of experience</option>
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
							<div className="col-lg-2 offset-lg-1 col-md-6">
								<button onClick={handleSubmit} type="submit" className="site-button btn-block">Find Cv</button>
							</div>
							<div className="col-lg-2 col-md-6">
								<button onClick={handleClear} type="reset" className="site-button btn-block">Clear filters</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div >
	)
}
export default Cvfindbox;