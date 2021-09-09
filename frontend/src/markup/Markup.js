import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './Pages/Homepage1';
import Homepage2 from './Pages/Homepage2';
import BrowseCv from './Pages/BrowseCv';
import CvDetail from './Pages/CvDetail'

import EmployeeProfile from './Pages/employee/EmployeeProfile';
import EmployeeCv from './Pages/employee/EmployeeCv';
import Jobmyresume from './Pages/Jobmyresume';
import Jobsappliedjob from './Pages/Jobsappliedjob';
import Jobsalert from './Pages/Jobsalert';
import Jobsavedjobs from './Pages/Jobsavedjobs';
import Jobcvmanager from './Pages/Jobcvmanager';
import ChangePasswordEmployee from './Pages/employee/ChangePasswordEmployee';

import EmployerProfile from './Pages/employer/EmployerProfile';
import ChangePasswordEmployer from './Pages/employer/ChangePasswordEmployer';
import FavoriteCv from './Pages/employer/FavoriteCv';

import Companyprofile from './Pages/Companyprofile';
import Companyresume from './Pages/Companyresume';
import Componypostjobs from './Pages/Componypostjobs';
import Companymanage from './Pages/Companymanage';
import Companytransactions from './Pages/Companytransactions';
import Browsecandidates from './Pages/Browsecandidates';

import AdminProfile from './Pages/admin/AdminProfile'
import CreateCategory from './Pages/admin/CreateCategory'
import CreateSubCategory from './Pages/admin/CreateSubCategory'
import DeleteCategory from './Pages/admin/DeleteCategory'
import DeleteSubCategory from './Pages/admin/DeleteSubCategory'
import VerifiedCv from './Pages/admin/VerifiedCv'
import MaxVideoSize from './Pages/admin/MaxVideoSize'
import EmployeeUpdate from './Pages/admin/EmployeeUpdate'
import VerifiedUser from './Pages/admin/VerifiedUser'
import UnverifiedUser from './Pages/admin/UnverifiedUser'
import ChangePasswordAdmin from './Pages/admin/ChangePasswordAdmin'
import RegisterAdmin from './Pages/admin/RegisterAdmin'

import Aboutus from './Pages/Aboutus';
import Jobdetail from './Pages/Jobdetail';
import Companies from './Pages/Companies';
import Freejobalerts from './Pages/Freejobalerts';
import Browsejoblist from './Pages/Browsejoblist';
import Browsejobfilterlist from './Pages/Browsejobfilterlist';
import Browsejobfiltergrid from './Pages/Browsejobfiltergrid';

import Categoryalljob from './Pages/Categoryalljob';
import Categorycompanyjob from './Pages/Categorycompanyjob';
import Categorydesignationsjob from './Pages/Categorydesignationsjob';
import Categoryjobs from './Pages/Categoryjobs';
import Categorylocationjobs from './Pages/Categorylocationjobs';
import Categoryskilljobs from './Pages/Categoryskilljobs';

import Portfoliogrid2 from './Pages/Portfoliogrid2';

import Loginpage1 from './Pages/Loginpage1';
import Loginpage2 from './Pages/Loginpage2';
import Loginpage3 from './Pages/Loginpage3';

import VerifyEmail from './Pages/VerifyEmail';
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'

import RegisterSelection from './Pages/RegisterSelection';
import RegisterEmployer from './Pages/RegisterEmployer';
import RegisterEmployee from './Pages/RegisterEmployee';
import Register2 from './Pages/Register2';
import Error404 from './Pages/Error404';

import Contact from './Pages/Contact';


import Blogclassic from './Pages/Blogclassic';
import Blogclassicsidebar from './Pages/Blogclassicsidebar';
import Blogdetailgrid from './Pages/Blogdetailgrid';
import Blogdetailgridsidebar from './Pages/Blogdetailgridsidebar';
import Blogleftimg from './Pages/Blogleftimg';
import Blogdetail from './Pages/Blogdetail';
import ScrollToTop from './Element/ScrollToTop';

import NotFound from './Pages/404'
import AuthRoute from './routes/AuthRoute'
import AdminRoute from './routes/AdminRoute'
import EmployeeRoute from './routes/EmployeeRoute'
import EmployerRoute from './routes/EmployerRoute'

class Markup extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="page-wraper">
					<Switch>
						<Route path='/' exact component={Homepage} />
						<Route path='/index-2' exact component={Homepage2} />
						<Route path='/browse-cv' exact component={BrowseCv} />
						<Route path='/cv/:cvId' exact component={CvDetail} />

						<EmployeeRoute path='/employee/profile' exact component={EmployeeProfile} />
						<EmployeeRoute path='/employee/cv' exact component={EmployeeCv} />
						<EmployeeRoute path='/employee/my-resume' exact component={Jobmyresume} />
						<EmployeeRoute path='/employee/jobs-applied-job' exact component={Jobsappliedjob} />
						<EmployeeRoute path='/employee/jobs-alerts' exact component={Jobsalert} />
						<EmployeeRoute path='/employee/jobs-saved-jobs' exact component={Jobsavedjobs} />
						<EmployeeRoute path='/employee/cv-manager' exact component={Jobcvmanager} />
						<EmployeeRoute path='/employee/change-password' exact component={ChangePasswordEmployee} />

						<EmployerRoute path='/employer/profile' exact component={EmployerProfile} />
						<EmployerRoute path='/employer/change-password' exact component={ChangePasswordEmployer} />
						<EmployerRoute path='/employer/cv/favorite' exact component={FavoriteCv} />

						<Route path='/company-profile' exact component={Companyprofile} />
						<Route path='/company-resume' exact component={Companyresume} />
						<Route path='/company-post-jobs' exact component={Componypostjobs} />
						<Route path='/company-manage-job' exact component={Companymanage} />
						<Route path='/company-transactions' exact component={Companytransactions} />
						<Route path='/browse-candidates' exact component={Browsecandidates} />

						<AdminRoute path='/admin/profile' exact component={AdminProfile} />
						<AdminRoute path='/admin/create-category' exact component={CreateCategory} />
						<AdminRoute path='/admin/create-sub-category' exact component={CreateSubCategory} />
						<AdminRoute path='/admin/delete-category' exact component={DeleteCategory} />
						<AdminRoute path='/admin/delete-subcategory' exact component={DeleteSubCategory} />
						<AdminRoute path='/admin/cv/verified' exact component={VerifiedCv} />
						<AdminRoute path='/admin/set-max-video-size' exact component={MaxVideoSize} />
						<AdminRoute path='/admin/employee/update/:id' exact component={EmployeeUpdate} />
						<AdminRoute path='/admin/users/verified' exact component={VerifiedUser} />
						<AdminRoute path='/admin/users/unverified' exact component={UnverifiedUser} />
						<AdminRoute path='/admin/change-password' exact component={ChangePasswordAdmin} />
						<AdminRoute path='/admin/register-admin' exact component={RegisterAdmin} />

						<Route path='/about-us' exact component={Aboutus} />
						<Route path='/job-detail' exact component={Jobdetail} />
						<Route path='/companies' exact component={Companies} />
						<Route path='/free-job-alerts' exact component={Freejobalerts} />
						<Route path='/browse-job-list' exact component={Browsejoblist} />
						<Route path='/browse-job-filter-list' exact component={Browsejobfilterlist} />
						<Route path='/browse-job-filter-grid' exact component={Browsejobfiltergrid} />

						<Route path='/category-all-jobs' exact component={Categoryalljob} />
						<Route path='/category-company-jobs' exact component={Categorycompanyjob} />
						<Route path='/category-designations-jobs' exact component={Categorydesignationsjob} />
						<Route path='/category-jobs' exact component={Categoryjobs} />
						<Route path='/category-location-jobs' exact component={Categorylocationjobs} />
						<Route path='/category-skill-jobs' exact component={Categoryskilljobs} />

						<Route path='/portfolio-grid-2' exact component={Portfoliogrid2} />

						<AuthRoute path='/login' exact component={Loginpage1} />
						<AuthRoute path='/login-2' exact component={Loginpage2} />
						<AuthRoute path='/login-3' exact component={Loginpage3} />

						<AuthRoute path='/verify/email/:id' exact component={VerifyEmail} />
						<AuthRoute path='/forgot/password' exact component={ForgotPassword} />
						<AuthRoute path='/reset-password/:id' exact component={ResetPassword} />

						<AuthRoute path='/register-selection' exact component={RegisterSelection} />
						<AuthRoute path='/register-employee' exact component={RegisterEmployee} />
						<AuthRoute path='/register-employer' exact component={RegisterEmployer} />
						<AuthRoute path='/register-2' exact component={Register2} />
						<Route path='/error-404' exact component={Error404} />

						<Route path='/contact' exact component={Contact} />

						<Route path='/blog-classic' exact component={Blogclassic} />
						<Route path='/blog-classic-sidebar' exact component={Blogclassicsidebar} />
						<Route path='/blog-detailed-grid' exact component={Blogdetailgrid} />
						<Route path='/blog-detailed-grid-sidebar' exact component={Blogdetailgridsidebar} />
						<Route path='/blog-left-img' exact component={Blogleftimg} />
						<Route path='/blog-details' exact component={Blogdetail} />

						<Route path='/not-found' component={NotFound} />
						<Route path='*' component={NotFound} />

					</Switch>
				</div>
				<ScrollToTop />
			</BrowserRouter>
		)
	}

}

export default Markup;