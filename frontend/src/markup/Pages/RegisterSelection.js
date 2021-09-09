import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './../Layout/Header'
import Footer from './../Layout/Footer'
import MetaData from '../Layout/MetaData'

var bnr = require('./../../images/banner/bnr2.jpg');

const RegisterSelection = () => {

    const [select, setSelect] = useState(false)

    const handleChange = e => {
        setSelect(e.target.value)
    }

    return (
        <>
            <MetaData title='Register-selection' />
            <div className="page-wraper">
                <Header />

                <div className="page-content">
                    <div className="section-full content-inner-2 shop-account bg-cv1">

                        <div className="container">

                            <div className="max-w500 m-auto bg-grey m-b30">

                                <div className="p-a30 job-bx browse-job radius-sm seth mb-3">
                                    <label className="form-check-label" htmlFor="exampleRadios1" style={{ fontSize: '25px' }}>
                                        <div className="p-3 ">
                                            <div className="form-check">
                                                <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios1" value="/register-employee" onChange={handleChange} />

                                                <span className='ml-1'>Register as job seeker</span>

                                            </div>
                                        </div>
                                    </label>


                                </div>

                            </div>


                            <div className="max-w500 m-auto bg-white m-b30">

                                <div className="p-a30 job-bx browse-job radius-sm seth mb-3">
                                    <label className="form-check-label" htmlFor="exampleRadios2" style={{ fontSize: '25px' }}>

                                        <div className="p-3 ">
                                            <div className="form-check">
                                                <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios2" value="/register-employer" onChange={handleChange} />

                                                <span className='ml-1'>Register as employer</span>

                                            </div>
                                        </div>

                                        {/* <br /> */}
                                    </label>
                                </div>

                            </div>

                            <div className="max-w500 bg-grey m-auto m-b30">
                                {!select ? <button type="submit" className="site-button font-weight-bold" style={{ opacity: select ? '1' : '.5', width: '100%', borderRadius: '0' }} disabled={!select} > Next</button> : <Link to={select} className="site-button bg-cv3 font-weight-bold" disabled={!select} style={{ width: '100%', borderRadius: '0' }}>Next</Link>}
                            </div>
                        </div>

                    </div>

                </div>
                <Footer />

            </div >

        </>)
}

export default RegisterSelection;