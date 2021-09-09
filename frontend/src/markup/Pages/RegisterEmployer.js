import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { countries } from 'countries-list'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import MetaData from '../Layout/MetaData'
import { registerEmployer } from '../../actions/authActions'
import { REGISTER_EMPLOYER_RESET } from '../../actions/actionTypes'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '10px'
    },
}));


const RegisterEmployer = ({ history }) => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const alert = useAlert();
    const firstMount = useRef(true)

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        country: '',
    });

    const {
        name,
        email,
        password,
        confirmPassword,
        phone,
        country,
    } = user;


    const countriesList = Object.values(countries);

    const { loading, message, error } = useSelector(state => state.registerEmployer)

    useEffect(() => {
        if (firstMount.current) {
            firstMount.current = false
            return
        }
        if (message) {
            alert.success(message)
        }
        if (error) {
            if (error === "Internal server error")
                alert.error(error)
            else
                alert.error("Please fill all required fields")

        }
    }, [alert, dispatch, message, error])

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: REGISTER_EMPLOYER_RESET })
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        formData.set('country', country);
        formData.set('phone', phone);
        dispatch(registerEmployer(formData, history))
    };

    return (
        <div className="page-wraper">
            <MetaData title='Register-Employer' />
            <Header />
            <div className="page-content">
                <div className="section-full content-inner browse-job shop-account bg-cv1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 m-b30">
                                <div className="p-a30 job-bx max-w700 radius-sm bg-grey m-auto">
                                    <div className="tab-content">
                                        <form id="login" className="tab-pane active" onSubmit={handleSubmit}>
                                            <h4 className="font-weight-700 m-b5 text-dark">PERSONAL INFORMATION</h4>
                                            <p className="font-weight-600">If you have an account with us, please log in.</p>
                                            <p className="font-weight-bold text-danger" style={{ fontSize: '17px' }}>
                                                Fields marked with * are required
                                            </p>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="font-weight-700">Name </label>
                                                        <input name="name" className="form-control" placeholder="First Name" type="text" onChange={handleChange} />
                                                        {error && error.name && <p className='text-danger mt-2'>{error.name}</p>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="font-weight-700">E-MAIL <span className='text-danger'>*</span></label>
                                                        <input name="email" required="" className="form-control" placeholder="Your Email Address" type="email" onChange={handleChange} />
                                                        {error && error.email && <p className='text-danger mt-2'>{error.email}</p>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="font-weight-700">Password <span className='text-danger'>*</span></label>
                                                        <input name="password" required="" className="form-control " placeholder="Type Password" type="password" onChange={handleChange} />
                                                        {error && error.password && <p className='text-danger mt-2'>{error.password}</p>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="font-weight-700">Confirm Password <span className='text-danger'>*</span></label>
                                                        <input name="confirmPassword" required="" className="form-control " placeholder="Type Password" type="password" onChange={handleChange} />
                                                        {error && error.confirmPassword && <p className='text-danger mt-2'>{error.confirmPassword}</p>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="country_field">
                                                            Country
                                                        </label>
                                                        <select
                                                            id="country_field"
                                                            className="form-control"
                                                            value={country}
                                                            name="country"
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">--- Select ---</option>
                                                            {countriesList.map(
                                                                (country) => (
                                                                    <option
                                                                        key={
                                                                            country.name
                                                                        }>
                                                                        {country.name}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <label className="font-weight-700">
                                                            Phone{' '}
                                                        </label>
                                                        <input
                                                            name="phone"
                                                            value={phone}
                                                            className="form-control"
                                                            placeholder="Enter your state"
                                                            type="text"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="text-left">
                                                <button
                                                    type="submit"
                                                    disabled={loading ? true : false}
                                                    className="site-button"
                                                    style={{ opacity: loading ? '0.7' : '1', width: '100%' }}
                                                >
                                                    {loading ? <>Please wait. It might take few minutes ... </> : 'CREATE'}


                                                </button>
                                            </div>
                                            {loading &&
                                                <div className={classes.root}>
                                                    <LinearProgress />
                                                </div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}
export default RegisterEmployer;