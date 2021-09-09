import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Jobsearchform from './../Element/Jobsearchform';
import Companyname from './../Element/Companyname';

var bnr = require('./../../images/banner/bnr1.jpg');

const listBox1 =[
	{ image : require("./../../images/logo/logo17.png"), title : 'Email Marketing',	},
	{ image : require("./../../images/logo/logo18.png"), title : '24/7 Customer Jobs', },
	{ image : require("./../../images/logo/logo19.png"), title : 'African Commodities DMCC Jobs', },
	{ image : require("./../../images/logo/logo20.png"), title : 'Foton Motors Jobs', },
	{ image : require("./../../images/logo/logo21.png"), title : 'Religare Technologies Jobs', },
	{ image : require("./../../images/logo/logo17.png"), title : 'Bank Job', },
	{ image : require("./../../images/logo/logo18.png"), title : 'Philips Software Centre Jobs', },
	{ image : require("./../../images/logo/logo19.png"), title : 'Samsung Software Jobs', },
	{ image : require("./../../images/logo/logo20.png"), title : 'Directi Jobs', },
	{ image : require("./../../images/logo/logo21.png"), title : 'Data Entry Jobs', },
]
const listBox2 =[
	{ image : require("./../../images/logo/logo21.png"), title : 'Philips Software Centre Jobs', },
	{ image : require("./../../images/logo/logo20.png"), title : 'Bank Jobs', },
	{ image : require("./../../images/logo/logo19.png"), title : 'Samsung Software Jobs', },
	{ image : require("./../../images/logo/logo18.png"), title : 'Directi Jobs', },
	{ image : require("./../../images/logo/logo17.png"), title : 'Data Entry Jobs',	},
	{ image : require("./../../images/logo/logo21.png"), title : 'Bank Job', },
	{ image : require("./../../images/logo/logo20.png"), title : 'Email Marketing',	},
	{ image : require("./../../images/logo/logo19.png"), title : '24/7 Customer Jobs', },
	{ image : require("./../../images/logo/logo18.png"), title : 'African Commodities DMCC Jobs', },
	{ image : require("./../../images/logo/logo17.png"), title : 'Foton Motors Jobs',	},
]
const listBox3 =[
	{ image : require("./../../images/logo/logo18.png"), title : 'Directi Jobs', },
	{ image : require("./../../images/logo/logo17.png"), title : 'Data Entry Jobs', },
	{ image : require("./../../images/logo/logo20.png"), title : 'Philips Software Centre Jobs', },
	{ image : require("./../../images/logo/logo21.png"), title : '24/7 Customer Jobs', },
	{ image : require("./../../images/logo/logo19.png"), title : 'Bank Job',	},
	{ image : require("./../../images/logo/logo17.png"), title : 'Samsung Software Jobs', },
	{ image : require("./../../images/logo/logo18.png"), title : 'Directi Jobs',	},
	{ image : require("./../../images/logo/logo20.png"), title : 'Foton Motors Jobs', },
	{ image : require("./../../images/logo/logo21.png"), title : 'Email Marketing', },
	{ image : require("./../../images/logo/logo19.png"), title : 'African Commodities DMCC Jobs',	},
]
class Categorycompanyjob extends Component{
	render(){
		
		return(
			<div className="page-wraper">
				
				<Header />
				<div className="page-content">
					
					<div className="dez-bnr-inr jobs-category overlay-black-middle" style={{backgroundImage:"url(" + bnr + ")"}}>
						<div className="container">
							<div className="dez-bnr-inr-entry">
								
								<Jobsearchform />
								
								<div className="category-jobs-info">
									<div className="nav">
										<ul>
											<li ><Link to={"/category-all-jobs"}>All Jobs</Link></li>
											<li className="active"><Link to ={"/category-company-jobs"}>Jobs by Company</Link></li>
											<li><Link to ={"/category-jobs"}>Jobs by Category</Link></li>
											<li><Link to ={"/category-location-jobs"}>Jobs by Location</Link></li>
											<li ><Link to ={"/category-designations-jobs"}>Jobs by Designation</Link></li>
											<li><Link to ={"/category-skill-jobs"}>Jobs by Skill</Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="content-block">
						
						<div className="section-full content-inner jobs-category-bx">
							<div className="container">
								<div className="row">
									<div className="col-lg-12 m-b30">
										<div className="job-bx bg-white">
											<div className="job-bx-title clearfix">
												<h6 className="font-weight-700 pull-left text-uppercase">Browse Jobs by Companies</h6>
											</div>
											
											<Companyname />
											
											<div className="row">
												<div className="col-lg-4 col-sm-12">
													<ul className="category-list category-bx">
														{listBox1.map((item,index)=>(	
															<li key={index}>
																<Link to = {""}>
																	<div className="logo"><img src={item.image} alt="" /></div>
																	<span>{item.title}</span>
																</Link>
															</li>
														))}
														
													</ul>
												</div> 
												<div className="col-lg-4 col-sm-12">
													<ul className="category-list category-bx">
														{listBox2.map((item,index)=>(	
															<li key={index}>
																<Link to = {""}>
																	<div className="logo"><img src={item.image} alt="" /></div>
																	<span>{item.title}</span>
																</Link>
															</li>
														))}	
														
													</ul>
												</div>
												<div className="col-lg-4 col-sm-12">
													<ul className="category-list category-bx">
														{listBox3.map((item,index)=>(
															<li key={index}>
																<Link to = {""}>
																	<div className="logo"><img src={item.image} alt="" /></div>
																	<span>{item.title}</span>
																</Link>
															</li>
														))}	
														
													</ul>
												</div>
											</div>   
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
export default Categorycompanyjob;