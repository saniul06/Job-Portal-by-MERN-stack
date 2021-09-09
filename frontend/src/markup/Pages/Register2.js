import React, {Component} from 'react';
import {Link} from 'react-router-dom';

var bnr = require('./../../images/background/bg6.jpg');

class Register2 extends Component{	
	render(){
		return(
			<div className="page-wraper">
				<div className="browse-job login-style3">
					
					<div className="bg-img-fix" style={{backgroundImage:`url(${bnr})`, height: "100vh" }}>
						<div className="row">
							<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
								<div className="login-form style-2">
									<div className="logo-header text-center p-tb30">
										<Link to={"./"}><img src={require("./../../images/logo.png")} alt="" /></Link>
									</div>
									<div className="clearfix"></div>
									<div className="tab-content nav p-b30 tab">
										<div id="login" className="tab-pane active ">
											<form className=" dez-form p-b30">
												<h3 className="form-title m-t0">Personal Information</h3>
												<div className="dez-separator-outer m-b5">
													<div className="dez-separator bg-primary style-liner"></div>
												</div>
												<p>Enter your e-mail address and your password. </p>
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="User Name" type="text" />
												</div>
												<div className="form-group">
													<input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" />
												</div>
												<div className="form-group text-left">
													<button className="site-button dz-xs-flex m-r5">login</button>
													<span className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" id="check1" name="example1" />
														<label className="custom-control-label" htmlFor="check1">Remember me</label>
													</span>
													<Link data-toggle="tab" to="#forgot-password" className="forget-pass m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link> 
												</div>
												<div className="dz-social clearfix">
													<h5 className="form-title m-t5 pull-left">Sign In With</h5>
													<ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
														<li><Link to={''} className="fa fa-facebook  fb-btn mr-1"  target="bank"></Link></li>
														<li><Link to={''} className="fa fa-twitter  tw-btn mr-1"   target="bank"></Link></li>
														<li><Link to={''} className="fa fa-linkedin link-btn mr-1" target="bank"></Link></li>
														<li><Link to={''} className="fa fa-google-plus  gplus-btn" target="bank"></Link></li>
													</ul>
												</div>
											</form>
											<div className="text-center bottom"> 
												<Link data-toggle="tab" to="#registration-form" className="site-button button-md btn-block text-white">Create an account</Link> 
											</div>
										</div>
										<div id="forgot-password" className="tab-pane fade">
											<form className="dez-form">
												<h3 className="form-title m-t0">Forget Password ?</h3>
												<div className="dez-separator-outer m-b5">
													<div className="dez-separator bg-primary style-liner"></div>
												</div>
												<p>Enter your e-mail address below to reset your password. </p>
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="Email Address" type="text" />
												</div>
												<div className="form-group clearfix text-left"> 
													<Link className="site-button outline gray" data-toggle="tab" to="#login">Back</Link>
													<button className="site-button pull-right">Submit</button>
												</div>
											</form>
										</div>
										<div id="registration-form" className="tab-pane fade">
											<form className="dez-form ">
												<h3 className="form-title m-t0">Sign Up</h3>
												<div className="dez-separator-outer m-b5">
													<div className="dez-separator bg-primary style-liner"></div>
												</div>
												<p>Enter your personal details below: </p>
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="Full Name" type="text" />
												</div>
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="User Name" type="text" />
												</div>
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="Email Address" type="text" />
												</div>
												
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="Password" type="password" />
												</div>
												<div className="form-group">
													<input name="dzName" required="" className="form-control" placeholder="Re-type Your Password" type="password" />
												</div>
												<div className="m-b30">
													<span className="custom-control custom-checkbox float-left m-r5">
														<input type="checkbox" className="custom-control-input" id="check2" name="example1" />
														<label className="custom-control-label" htmlFor="check2">I agree to the</label>
													</span>
													<label><Link to="#">Terms of Service </Link>& <Link to="#">Privacy Policy</Link></label>
												</div>
												<div className="form-group clearfix text-left">
													<Link className="site-button outline gray" data-toggle="tab" to="#login">Back</Link>
													<button className="site-button pull-right">Submit</button>
												</div>
											</form>
										</div>
									</div>
									<div className="bottom-footer clearfix m-t10 m-b20 row text-center">
										<div className="col-lg-12 text-center">
											<span> © Copyright by <i className="fa fa-heart m-lr5 text-red heart"></i>
											<Link to= {''} >DexignZone </Link> All rights reserved.</span> 
										</div>
									</div>	
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		)
	}
}
export default Register2;