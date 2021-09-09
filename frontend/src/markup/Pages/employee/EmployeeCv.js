import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import MetaData from '../../Layout/MetaData'
import Profilesidebar from '../../Element/Profilesidebar'
import CvUpdate from '../../Element/CvUpdate'

const EmployeeCv = ({ history }) => {

    // const { loading } = useSelector(state => state.updateCv)
    // const { employee } = useSelector(state => state.employee)

    return (
        <>
            <MetaData title='Cv-info' />
            <div className="page-wraper">
                < Header />
                <div className="page-content bg-white">
                    <div className="content-block">
                        <div className="section-full bg-white browse-job p-t50 p-b20">
                            <div className="container">
                                <div className="row">
                                    <Profilesidebar employeeCv='active' />
                                    <CvUpdate />
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

export default EmployeeCv