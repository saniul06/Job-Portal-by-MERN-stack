import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';

var bnr = require('./../../images/banner/bnr1.jpg');

class Error404 extends Component{
	render(){
		return(
			<div className="page-wraper">
				<Header />
				<div className="page-content">
					
					<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr + ")"}}>
						<div className="container">
							<div className="dez-bnr-inr-entry">
								<h1 className="text-white">Error 404</h1>
								
								<div className="breadcrumb-row">
									<ul className="list-inline">
										<li><Link to={"#"}>Home</Link></li>
										<li>Error 404</li>
									</ul>
								</div>
								
							</div>
						</div>
					</div>
					
					<div className="section-full content-inner-3 bg-white">
						<div className="container">
							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 error-page text-center">
									<h2 className="dz_error text-secondry">404</h2>
									<h3>OOPS!</h3>
									<h4 className="text-primary">Page Not Found</h4>
									<Link to={"./"} className="site-button">Back To Home</Link>
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
export default Error404;