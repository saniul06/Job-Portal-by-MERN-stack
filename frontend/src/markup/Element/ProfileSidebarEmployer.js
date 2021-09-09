import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProfileSidebarEmployer = ({ employerProfile, changePassword, favoriteCv }) => {

    const { loading, user } = useSelector(state => state.auth)

    return (
        <div className="col-xl-3 col-lg-4 m-b30">
            <div className="sticky-top">
                <div className="candidate-info">
                    <div className="candidate-detail text-center">

                        <div className="candidate-title">
                            <div className="">
                                <h4 className="m-b5"><Link className='text-dark' to={""}>{user && user.name}</Link></h4>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li><Link to={"/employer/profile"} className={employerProfile}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile Info</span></Link></li>
                        <li><Link to={"/employer/change-password"} className={changePassword}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Change Password</span></Link></li>
                        <li><Link to={"/employer/cv/favorite"} className={favoriteCv}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Favorite Cv's</span></Link></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProfileSidebarEmployer;