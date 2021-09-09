import React, {Component} from 'react';
import {Link} from 'react-router-dom';

var bnr = require('./../../images/background/bg6.jpg');

class Loginpage2 extends Component{
	render(){
		return(
			<div className="page-wraper">
				<div className="page-content bg-white login-style2" style={{backgroundImage: `url(${bnr})`, backgroundSize: "cover" }}>
					<div className="section-full">
						
						<div className="container">
							<div className="row">
								<div className="col-lg-6 col-md-6 d-flex">
									<div className="text-white max-w400 align-self-center">
										<div className="logo">
											<Link to={"#"}><img src={require("./../../images/logo-white2.png")} alt="" /></Link>
										</div>
										<h2 className="m-b10">Login To You Now</h2>
										<p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry.</p>
										<ul className="list-inline m-a0">
											<li><Link to={''} className="m-r10 text-white "><i className="fa fa-facebook"></i></Link></li>
											<li><Link to={''} className="m-r10 text-white "><i className="fa fa-google-plus"></i></Link></li>
											<li><Link to={''} className="m-r10 text-white "><i className="fa fa-linkedin"></i></Link></li>
											<li><Link to={''} className="m-r10 text-white "><i className="fa fa-instagram"></i></Link></li>
											<li><Link to={''} className="m-r10 text-white"><i className="fa fa-twitter"></i></Link></li>
										</ul>
									</div>
								</div>
								<div className="col-lg-6 col-md-6">
									<div className="login-2 submit-resume p-a30 seth">
										<div className="tab-content nav">
											<form id="login" className="tab-pane active col-12 p-a0 ">
												<p className="font-weight-600">If you have an account with us, please log in.</p>
												<div className="form-group">
													<label>E-Mail Address*</label>
													<div className="input-group">
														<input name="dzName" required="" className="form-control" placeholder="Your Email Address" type="email" />
													</div>
												</div>
												<div className="form-group">
													<label>Password *</label>
													<div className="input-group">
														<input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" />
													</div>
												</div>
												<div className="text-center">
													<button className="site-button float-left">login</button>
													<Link data-toggle="tab" to="#forgot-password" className="site-button-link forget-pass m-t15 float-right"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> 
												</div>
											</form>
											<form id="forgot-password" className="tab-pane fade  col-12 p-a0">
												<p>We will send you an email to reset your password. </p>
												<div className="form-group">
													<label>E-Mail address *</label>
													<div className="input-group">
														<input name="dzName" required="" className="form-control" placeholder="Your Email Address" type="email" />
													</div>
												</div>
												<div className="text-left"> 
													<Link className="site-button outline gray" data-toggle="tab" to="#login">Back</Link>
													<button className="site-button pull-right">Submit</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					<footer className="login-footer">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 text-center">
									<span className="float-left">© Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
									<Link to={""}>DexignZone </Link> </span>
									<span className="float-right">
										All rights reserved.
									</span>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		)
	}
}
export default Loginpage2;	