import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProfileSidebarAdmin = ({ adminProfile, adminRegister, changePassword, VerifiedUser, UnverifiedUser, createCategory, createSubcategory, deleteCategory, deleteSubcategory, Cv, maxVideoSize }) => {

    const { loading, user } = useSelector(state => state.auth)
    const { avatarPreview } = useSelector(state => state.avatarPreview)

    return (
        <div className="col-xl-3 col-lg-4 m-b30">
            <div className="sticky-top">
                <div className="candidate-info company-info">
                    <div className="candidate-detail text-center">
                        <div className="candidate-title">
                            <div className="">
                                <h4 className="m-b5"><Link className='text-dark' to={""}>{user && user.name}</Link></h4>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li><Link to={"/admin/profile"} className={adminProfile}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>My Profile</span></Link></li>
                        <li><Link to={"/admin/change-password"} className={changePassword}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Change Password</span></Link></li>
                        <li><Link to={"/admin/users/verified"} className={VerifiedUser}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Verified User's</span></Link></li>
                        <li><Link to={"/admin/users/unverified"} className={UnverifiedUser}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Unverified User's</span></Link></li>
                        <li><Link to={"/admin/cv/verified"} className={Cv}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Verified Cv's</span></Link></li>
                        <li><Link to={"/admin/register-admin"} className={adminRegister}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Create Admin</span></Link></li>
                        <li><Link to={"/admin/create-category"} className={createCategory}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Create Category</span></Link></li>
                        <li><Link to={"/admin/create-sub-category"} className={createSubcategory}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Create Sub-category</span></Link></li>
                        <li><Link to={"/admin/delete-category"} className={deleteCategory}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Delete Category</span></Link></li>
                        <li><Link to={"/admin/delete-subcategory"} className={deleteSubcategory}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Delete Sub-Category</span></Link></li>
                        <li><Link to={"/admin/set-max-video-size"} className={maxVideoSize}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Max Video Size</span></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileSidebarAdmin
