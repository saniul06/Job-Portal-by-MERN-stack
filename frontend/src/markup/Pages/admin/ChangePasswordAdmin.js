import React from 'react'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import MetaData from '../../Layout/MetaData'
import ProfileSidebarAdmin from '../../Element/ProfileSidebarAdmin'
import PasswordUpdate from '../../Element/PasswordUpdate'

const ChangepasswordAdmin = () => {
    return (
        <>
            <MetaData title='Change-password' />
            <Header />

            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-full bg-white browse-job p-t50 p-b20">
                        <div className="container">
                            <div className="row">
                                <ProfileSidebarAdmin changePassword='active' />
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
export default ChangepasswordAdmin;