import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import CvFindBox from './../Element/CvFindBox';
import Accordsidebar from './../Element/Accordsidebar';


var bnr = require('./../../images/banner/bnr1.jpg');

const jobBlog = [
	{
		title : 'Digital Marketing Executive',
	},
	{
		title : 'Digital Marketing Executive',
	},
	{
		title : 'Digital Marketing Executive',
	},
	{
		title : 'Digital Marketing Executive',
	},
	{
		title : 'Digital Marketing Executive',
	},
	{
		title : 'Digital Marketing Executive',
	},
]

class Browsejobfiltergrid extends Component{
	render(){
		return(
			<div className="page-wraper">
				
				<Header />
				<div className="page-content bg-white">
					
					<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url( " + bnr + ")"}}>
						<div className="container">
							<div className="dez-bnr-inr-entry">
								<h1 className="text-white">Browse Job Filter Grid</h1>
								
								<div className="breadcrumb-row">
									<ul className="list-inline">
										<li><Link to={"#"}>Home</Link></li>
										<li>Browse Job Filter Grid</li>
									</ul>
								</div>
								
							</div>
						</div>
					</div>
					
					<CvFindBox />
					
					<div className="content-block">
						<div className="section-full browse-job p-b50">
							<div className="container">
								<div className="row">
									<Accordsidebar />
									
									<div className="col-xl-9 col-lg-8 col-md-7">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">2269 Jobs Found</h5>
											<div className="float-right">
												<span className="select-title">Sort by freshness</span>
												<select className="custom-btn">
													<option>Last 2 Months</option>
													<option>Last Months</option>
													<option>Last Weeks</option>
													<option>Last 3 Days</option>
												</select>
												<div className="float-right p-tb5 p-r10">
													<Link to={"/browse-job-filter-list"} className="p-lr5"><i className="fa fa-th-list"></i></Link>
													<Link to={"/browse-job-filter-grid"} className="p-lr5"><i className="fa fa-th"></i></Link>
												</div>
											</div>
										</div>
										<ul className="post-job-bx browse-job-grid row">
											{jobBlog.map((item,index) => (
												<li className="col-lg-6 col-md-12" key={index} >
													<div className="post-bx">
														<div className="d-flex m-b30">
															<div className="job-post-info">
																<h5><Link to={"/job-detail"}>{item.title}</Link></h5>
																<ul>
																	<li><i className="fa fa-map-marker"></i> Sacramento, California</li>
																	<li><i className="fa fa-bookmark-o"></i> Full Time</li>
																	<li><i className="fa fa-clock-o"></i> Published 11 months ago</li>
																</ul>
															</div>
														</div>
														<div className="d-flex">
															<div className="job-time mr-auto">
																<Link to={''}><span>Full Time</span></Link>
															</div>
															<div className="salary-bx">
																<span>$1200 - $ 2500</span>
															</div>
														</div>
														<label className="like-btn">
															<input type="checkbox" />
															<span className="checkmark"></span>
														</label>
													</div>
												</li>
											))}	
											
										</ul>
										<div className="pagination-bx float-right m-t30">
											<ul className="pagination">
												<li className="previous"><Link to={''}><i className="ti-arrow-left"></i> Prev</Link></li>
												<li className="active"><Link to={''}>1</Link></li>
												<li><Link to={''}>2</Link></li>
												<li><Link to={''}>3</Link></li>
												<li className="next"><Link to={''}>Next <i className="ti-arrow-right"></i></Link></li>
											</ul>
										</div>
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
	
} 

export default Browsejobfiltergrid;