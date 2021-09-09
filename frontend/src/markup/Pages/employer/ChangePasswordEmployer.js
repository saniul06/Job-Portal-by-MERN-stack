import React from 'react'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import MetaData from '../../Layout/MetaData'
import ProfileSidebarEmployer from '../../Element/ProfileSidebarEmployer'
import PasswordUpdate from '../../Element/PasswordUpdate'

const ChangePasswordEmployer = () => {
    return (
        <>
            <MetaData title='Change-password' />
            <Header />

            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white browse-job p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarEmployer changePassword='active' />
                                <PasswordUpdate />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}
export default ChangePasswordEmployer