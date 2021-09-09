import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import MetaData from '../../Layout/MetaData'
import ProfileSidebarEmployer from '../../Element/ProfileSidebarEmployer'
import ProfileUpdate from '../../Element/ProfileUpdate'

const EmployerProfile = () => {

    const { loading } = useSelector(state => state.updateProfile)

    return (
        <>
            <MetaData title='Profile-info' />
            <div className="page-wraper" style={{ pointerEvents: loading ? 'none' : '' }}>

                < Header />
                <div className="page-content bg-white">
                    <div className="content-block">
                        <div className="section-full bg-white browse-job p-t50 p-b20">
                            <div className="container">
                                <div className="row">
                                    <ProfileSidebarEmployer employerProfile='active' />
                                    <ProfileUpdate />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >

        </>
    )
}
export default EmployerProfile;