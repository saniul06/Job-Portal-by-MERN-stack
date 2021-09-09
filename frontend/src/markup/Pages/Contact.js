import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import GoogleMaps from "simple-react-google-maps";

var bnr = require('./../../images/banner/bnr1.jpg');

class Contact extends Component{
	render(){
		return(
			<div className="page-wraper">
				<Header />
				<div className="page-content bg-white">
					
					<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr + ")"}}>
						<div className="container">
							<div className="dez-bnr-inr-entry">
								<h1 className="text-white">Contact Us</h1>
								
								<div className="breadcrumb-row">
									<ul className="list-inline">
										<li><Link to={"#"}>Home</Link></li>
										<li>Contact Us</li>
									</ul>
								</div>
								
							</div>
						</div>
					</div>
					
					<div className="section-full content-inner bg-white contact-style-1">
						<div className="container">
							<div className="row">
								
								<div className="col-lg-4 col-md-6 d-lg-flex d-md-flex">
									<div className="p-a30 border m-b30 contact-area border-1 align-self-stretch radius-sm">
										<h4 className="m-b10">Quick Contact</h4>
										<p>If you have any questions simply use the following contact details.</p>
										<ul className="no-margin">
											<li className="icon-bx-wraper left m-b30">
												<div className="icon-bx-xs border-1"> <Link to={"#"} className="icon-cell"><i className="ti-location-pin"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dez-tilte">Address:</h6>
													<p>123 West Street, Melbourne Victoria 3000 Australia</p>
												</div>
											</li>
											<li className="icon-bx-wraper left  m-b30">
												<div className="icon-bx-xs border-1"> <Link to={"#"} className="icon-cell"><i className="ti-email"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dez-tilte">Email:</h6>
													<p>info@example.com</p>
												</div>
											</li>
											<li className="icon-bx-wraper left">
												<div className="icon-bx-xs border-1"> <Link to={"#"} className="icon-cell"><i className="ti-mobile"></i></Link> </div>
												<div className="icon-content">
													<h6 className="text-uppercase m-tb0 dez-tilte">PHONE</h6>
													<p>+61 3 8376 6284</p>
												</div>
											</li>
										</ul>
										<div className="m-t20">
											<ul className="dez-social-icon dez-social-icon-lg">
												<li><Link to={""} className="fa fa-facebook bg-primary mr-1"></Link></li>
												<li><Link to={""} className="fa fa-twitter bg-primary mr-1"></Link></li>
												<li><Link to={""} className="fa fa-linkedin bg-primary mr-1"></Link></li>
												<li><Link to={""} className="fa fa-pinterest-p bg-primary mr-1"></Link></li>
												<li><Link to={""} className="fa fa-google-plus bg-primary"></Link></li>
											</ul>
										</div>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-6">
									<div className="p-a30 m-b30 radius-sm bg-gray clearfix">
										<h4>Send Message Us</h4>
										<div className="dzFormMsg"></div>
										<form method="post" className="dzForm" action="script/contact.php">
										<input type="hidden" value="Contact" name="dzToDo" />
											<div className="row">
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group">
															<input name="dzName" type="text" required className="form-control" placeholder="Your Name" />
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="form-group">
														<div className="input-group"> 
															<input name="dzEmail" type="email" className="form-control" required  placeholder="Your Email Address" />
														</div>
													</div>
												</div>
												 <div className="col-lg-12">
													<div className="form-group">
														<div className="input-group">
															<textarea name="dzMessage" rows="4" className="form-control" required placeholder="Your Message..."></textarea>
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="recaptcha-bx">
														<div className="input-group">
															<div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
															<input className="form-control d-none" style={{display:"none"}} data-recaptcha="true" required data-error="Please complete the Captcha" />
														</div>
													</div>
												</div>
												<div className="col-lg-12">
													<button name="submit" type="submit" value="Submit" className="site-button "> <span>Submit</span> </button>
												</div>
											</div>
										</form>
									</div>
								</div>
								
								<div className="col-lg-4 col-md-12 d-lg-flex m-b30">
									
									<GoogleMaps
										apiKey={"AIzaSyBPDjB2qkV4Yxn9h0tGSk2X5uH6NKmssXw"}
										style={{ height: "500px", width: "100%", border:"0" }}
										zoom={6}
										center={{ lat: 37.4224764, lng: -122.0842499 }}
										markers={{ lat: 37.4224764, lng: -122.0842499 }} //optional
									/>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				
				<Footer />
			</div>
		)
	}
}

export default Contact;