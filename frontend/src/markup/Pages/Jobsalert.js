import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Profilesidebar from '../Element/Profilesidebar';

const jobAlert = [
	{ title: 'Social Media Expert', date: 'December 15,2018', },
	{ title: 'Web Designer', date: 'November 10,2018', },
	{ title: 'Finance Accountant', date: 'October 5,2018', },
	{ title: 'Social Media Expert', date: 'December 15,2018', },
	{ title: 'Web Designer', date: 'November 10,2018', },
	{ title: 'Finance Accountant', date: 'October 5,2018', },
	{ title: 'Social Media Expert', date: 'December 15,2018', },
	{ title: 'Web Designer', date: 'November 10,2018', },
	{ title: 'Finance Accountant', date: 'October 5,2018', },
	{ title: 'Social Media Expert', date: 'December 15,2018', },
]

class Jobsalert extends Component {

	state = {
		// initial state
		show: false,
	}

	handleClose = () => {
		this.setState({ show: false });
	};
	handleShow = () => {
		this.setState({ show: true });
	};

	render() {
		return (
			<>
				<Header />
				<div className="page-content bg-white">

					<div className="content-block">

						<div className="section-full bg-white p-t50 p-b20">
							<div className="container">
								<div className="row">
									<Profilesidebar jobAlert='active' />
									<div className="col-xl-9 col-lg-8 m-b30">
										<div className="job-bx table-job-bx browse-job clearfix">
											<div className="job-bx-title clearfix">
												<h5 className="font-weight-700 pull-left text-uppercase">Job Alerts</h5>
												<div className="float-right">
													<span className="select-title">Sort by freshness</span>
													<select className="custom-btn">
														<option>Last 2 Months</option>
														<option>Last Months</option>
														<option>Last Weeks</option>
														<option>Last 3 Days</option>
													</select>
												</div>
											</div>
											<table>
												<thead>
													<tr>
														<th>Premium jobs</th>
														<th>Criterias</th>
														<th>Date</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{jobAlert.map((item, index) => (
														<tr key={index}>
															<td className="job-name"><Link to={"/job-detail"}>{item.title}</Link></td>
															<td className="criterias">Lorem Ipsum is simply dummy text.</td>
															<td className="date">{item.date}</td>
															<td className="job-links">
																<Link to={'#'} data-toggle="modal" data-target="#exampleModalLong" onClick={this.handleShow}>
																	<i className="fa fa-eye"></i></Link>
																<Link to={""}><i className="ti-trash"></i></Link>
															</td>
														</tr>
													))}

												</tbody>
											</table>
											<div className="pagination-bx float-right">
												<ul className="pagination">
													<li className="previous"><Link to={""}><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link to={""}>1</Link></li>
													<li><Link to={""}>2</Link></li>
													<li><Link to={""}>3</Link></li>
													<li className="next"><Link to={""}>Next <i className="ti-arrow-right"></i></Link></li>
												</ul>
											</div>
										</div>

										<Modal show={this.state.show} onHide={this.handleClose} className="modal fade modal-bx-info" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="modal-header">
														<div className="logo-img">
															<img alt="" src={require("./../../images/logo/icon2.png")} />
														</div>
														<h5 className="modal-title">Company Name</h5>
														<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div className="modal-body">
														<ul>
															<li><strong>Job Title :</strong><p> Web Developer – PHP, HTML, CSS </p></li>
															<li><strong>Experience :</strong><p>5 Year 3 Months</p></li>
															<li><strong>Deseription :</strong>
																<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since.</p>
															</li>
														</ul>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
													</div>
												</div>
											</div>
										</Modal>

									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<Footer />
			</>
		)
	}
}
export default Jobsalert;