import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import MetaData from '../Layout/MetaData'
import CountUp from 'react-countup';
import Jobcategories from './../Element/Jobcategories';
import Featureblog from './../Element/Featureblog';
import Jobsection from './../Element/Jobsection';
import Owltestimonial from './../Element/Owlblog1';

var bnr1 = require('./../../images/main-slider/slide2.jpg');
var bnr2 = require('./../../images/background/bg4.jpg');
var bnr3 = require('./../../images/lines.png');

const Homepage = () => {

	useEffect(() => {
		var i = 0;

		// Placeholder Animation Start
		var inputSelector = document.querySelectorAll('input, textarea');

		for (i = 0; i < inputSelector.length; i++) {
			inputSelector[i].addEventListener('focus', function (event) {
				return this.parentElement.parentElement.classList.add("focused");
			});
		}


		for (i = 0; i < inputSelector.length; i++) {
			inputSelector[i].addEventListener('blur', function (event) {
				var inputValue = this.value;
				if (inputValue === '') {
					this.parentElement.parentElement.classList.remove('filled');
					this.parentElement.parentElement.classList.remove('focused');
				} else {
					this.parentElement.parentElement.classList.add('filled');
				}
			});
		}

		// Placeholder Animation End
	}, [])

	return (
		<>
			<MetaData title='Home' />
			<div className="page-wraper">
				<Header />
				<div className="page-content">
					<div className="dez-bnr-inr dez-bnr-inr-md bg-cv1">
						<div className="container">
							<div className="dez-bnr-inr-entry align-m">
								<div className="find-job-bx">
									<Link to={"/browse-job"} className="site-button button-sm">Find Jobs, Employment & Career Opportunities</Link>
									<h2>Search Between More Then <br /> <span className="text-primary">50,000</span> Open Jobs.</h2>
									<form className="dezPlaceAni">
										<div className="row">
											<div className="col-lg-4 col-md-6">
												<div className="form-group">
													<label>Job Title, Keywords, or Phrase</label>
													<div className="input-group">
														<input type="text" className="form-control" placeholder="" />
														<div className="input-group-append">
															<span className="input-group-text"><i className="fa fa-search"></i></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-3 col-md-6">
												<div className="form-group">
													<label>Email address</label>
													<div className="input-group">
														<input type="text" className="form-control" placeholder="" />
														<div className="input-group-append">
															<span className="input-group-text"><i className="fa fa-map-marker"></i></span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-lg-3 col-md-6">
												<div className="form-group">
													<Form.Control as="select" custom className="select-btn">
														<option>Select Sector</option>
														<option>Construction</option>
														<option>Corodinator</option>
														<option>Employer</option>
														<option>Financial Career</option>
														<option>Information Technology</option>
														<option>Marketing</option>
														<option>Quality check</option>
														<option>Real Estate</option>
														<option>Sales</option>
														<option>Supporting</option>
														<option>Teaching</option>
													</Form.Control>

												</div>
											</div>
											<div className="col-lg-2 col-md-6">
												<button type="submit" to="/browse-job" className="site-button btn-block">Find Job</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="section-full job-categories content-inner-2 bg-cv2">
						<div className="container">
							<div className="section-head d-flex head-counter clearfix">
								<div className="mr-auto">
									<h2 className="m-b5">Popular Categories</h2>
									<h6 className="fw3">20+ Catetories work wating for you</h6>
								</div>
								<div className="head-counter-bx">
									<h2 className="m-b5 counter"><CountUp end={1800} duration={5} /></h2>
									<h6 className="fw3">Jobs Posted</h6>
								</div>
								<div className="head-counter-bx">
									<h2 className="m-b5 counter"><CountUp end={4500} duration={5} /></h2>
									<h6 className="fw3">Tasks Posted</h6>
								</div>
								<div className="head-counter-bx">
									<h2 className="m-b5 counter"><CountUp end={1500} duration={5} /></h2>
									<h6 className="fw3">Freelancers</h6>
								</div>
							</div>
							<Jobcategories />
						</div>
					</div>

					<Featureblog />

					<div className="section-full p-tb70 text-white text-center bg-cv2">
						<div className="container">
							<div className="section-head text-center text-white">
								<h2 className="m-b5">Testimonials</h2>
								<h5 className="fw4">Few words from candidates</h5>
							</div>

							<Owltestimonial />
						</div>
					</div>


				</div>
				<Footer />
			</div>

		</>)
}
export default Homepage;