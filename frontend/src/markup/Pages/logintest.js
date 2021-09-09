import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import { login } from '../../actions/authActions'

var bnr = require('./../../images/banner/bnr2.jpg');

const LoginTest = () => {

    const dispatch = useDispatch()

    const [image, setImage] = useState()

    const handleChange = e => {
        if (e.target.name === 'file') {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('file', image);
        dispatch(login(formData))
    }

    return (
        <div className="page-wraper">
            <Header />

            <div className="page-content">

                <div className="dez-bnr-inr overlay-black-middle bg-pt" style={{ backgroundImage: `url(${bnr})` }}>
                    <div className="container">
                        <div className="dez-bnr-inr-entry">
                            <h1 className="text-white">Login</h1>

                            <div className="breadcrumb-row">
                                <ul className="list-inline">
                                    <li><Link to={"#"}>Home</Link></li>
                                    <li>Login</li>

                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="section-full content-inner-2 shop-account">

                    <div className="container">
                        <div className="max-w500 m-auto bg-white m-b30">
                            <div className="p-a30 job-bx browse-job radius-sm seth">
                                <div className="tab-content nav">
                                    <form id="login" className="tab-pane active col-12 p-a0 " enctype="multipart/form-data" onSubmit={handleSubmit}>
                                        <h4 className="font-weight-700">LOGIN</h4>
                                        <img src="https://drive.google.com/uc?export=view&id=1-PODJU_oDJjhqbNGvyWc6YqiMs0exY6G" alt="" width={200} height={200} />
                                        <a href="https://drive.google.com/uc?id=1UHi34mrMsKp3W89Ix2I71KRBLwDXkS29&export=download">Download image</a>
                                        <p className="font-weight-600">If you have an account with us, please log in.</p>
                                        <div className="form-group">
                                            <label className="font-weight-700">E-MAIL *</label>
                                            <input name="dzName" required="" className="form-control" placeholder="Your Email Address" type="email" />
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-700">PASSWORD *</label>
                                            <input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="font-weight-700">image *</label>
                                            <input name="file" required="" className="form-control " placeholder="Type Password" type="file" onChange={handleChange} />
                                        </div>
                                        <div className="text-left">
                                            <button className="site-button m-r5 button-lg" type="submit">login</button>
                                            <Link data-toggle="tab" to="#forgot-password" className="m-l5 m-t15 forget-pass float-right"><i className="fa fa-unlock-alt"></i> Forgot Password</Link>
                                        </div>
                                    </form>
                                    <form id="forgot-password" className="tab-pane fade  col-12 p-a0">
                                        <h4 className="font-weight-700">FORGET PASSWORD ?</h4>
                                        <p className="font-weight-600">We will send you an email to reset your password. </p>
                                        <div className="form-group">
                                            <label className="font-weight-700">E-MAIL *</label>
                                            <input name="dzName" required="" className="form-control" placeholder="Your Email Address" type="email" />
                                        </div>
                                        <div className="text-left">
                                            <Link className="site-button outline gray button-lg" data-toggle="tab" to="#login">Back</Link>
                                            <button className="site-button pull-right button-lg">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Footer />

        </div >
    )
}

export default LoginTest;