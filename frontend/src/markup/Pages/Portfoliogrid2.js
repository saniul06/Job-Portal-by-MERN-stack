import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Tab1 from './../Element/Tab1';

var bnr = require('./../../images/banner/bnr2.jpg');

class Portfoliogrid2 extends Component{
	render(){
		return(
			<div className="page-wraper">
				<Header />
				<div className="page-content bg-white">
					
					<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url( " + bnr + ")" }}>
						<div className="container">
							<div className="dez-bnr-inr-entry">
								<h1 className="text-white">Portfolio Masonry</h1>
								
								<div className="breadcrumb-row">
									<ul className="list-inline">
										<li><Link to={"#"}>Home</Link></li>
										<li>Portfolio Masonry</li>
									</ul>
								</div>
								
							</div>
						</div>
					</div>
					<div className="content-block">
						<div className="section-full content-inner-2 portfolio-box">
							<div className="container">
								<div className="section-head text-black text-center m-b20">
									<h2 className="m-b10">Our Portfolio</h2>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
								</div>
								<Tab1 />
								
							</div>
						</div>
					</div>
					
				</div>
				<Footer />
				
			</div>	
		)
	}
}
export default Portfoliogrid2;