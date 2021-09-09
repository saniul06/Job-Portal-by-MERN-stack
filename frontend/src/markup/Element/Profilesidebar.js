import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profilesidebar = ({ employeeProfile, employeeCv, savedJobs, jobAlert, changePassword }) => {

	const { loading, user } = useSelector(state => state.auth)
	const { avatarPreview } = useSelector(state => state.avatarPreview)

	return (
		<div className="col-xl-3 col-lg-4 m-b30">
			<div className="sticky-top">
				<div className="candidate-info">
					<div className="candidate-detail text-center">

						{loading ? <CircularProgress style={{ color: '#000' }} /> : <div className="canditate-des">
							{avatarPreview ? <img src={avatarPreview} alt="" width={200} height={200} /> : <img src={user && user.avatar && user.avatar.avatarId ? `https://drive.google.com/uc?export=view&id=${user && user.avatar.avatarId}` : '/images/default_avatar.jpg'} alt="" width={200} height={200} />}

						</div>}
						<div className="candidate-title">
							<div className="">
								<h4 className="m-b5"><Link className='text-dark' to={""}>{user && user.name}</Link></h4>
							</div>
						</div>
					</div>
					<ul>
						<li><Link to={"/employee/profile"} className={employeeProfile}>
							<i className="fa fa-user-o" aria-hidden="true"></i>
							<span>Profile Info</span></Link></li>
						<li><Link to={"/employee/cv"} className={employeeCv}>
							<i className="fa fa-user-o" aria-hidden="true"></i>
							<span>Cv info</span></Link></li>
						<li><Link to={"/employee/my-resume"} className="">
							<i className="fa fa-file-text-o" aria-hidden="true"></i>
							<span>My Resume</span></Link></li>
						<li><Link to={"/employee/jobs-saved-jobs"} className={savedJobs}>
							<i className="fa fa-heart-o" aria-hidden="true"></i>
							<span>Saved Jobs</span></Link></li>
						<li><Link to={"/employee/jobs-applied-job"} className="">
							<i className="fa fa-briefcase" aria-hidden="true"></i>
							<span>Applied Jobs</span></Link></li>
						<li><Link to={"/employee/jobs-alerts"} className={jobAlert}>
							<i className="fa fa-bell-o" aria-hidden="true"></i>
							<span>Job Alerts</span></Link></li>
						<li><Link to={"/employee/cv-manager"} className="">
							<i className="fa fa-id-card-o" aria-hidden="true"></i>
							<span>CV Manager</span></Link></li>
						<li><Link to={"/employee/change-password"} className={changePassword}>
							<i className="fa fa-key" aria-hidden="true"></i>
							<span>Change Password</span></Link></li>
						<li><Link to={"./"} className="">
							<i className="fa fa-sign-out" aria-hidden="true"></i>
							<span>Log Out</span></Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Profilesidebar;