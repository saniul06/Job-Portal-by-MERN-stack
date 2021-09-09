import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { countries } from 'countries-list'
import { Form } from 'react-bootstrap';
import { getAllCategoriesAndSubCategories, updateCv, loadEmployee } from '../../actions/authActions'
import { UPDATE_CV_RESET, LOAD_EMPLOYEE_RESET } from '../../actions/actionTypes'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '10px'
    },
}));

const CvUpdate = ({ history, match }) => {

    const classes = useStyles()

    const dispatch = useDispatch()
    const alert = useAlert()
    const firstMount = useRef(true)

    const { allCategoriesAndSubCategories } = useSelector(state => state.allCategoriesAndSubCategories)
    const { loading, message, error } = useSelector(state => state.updateCv)
    const { user: currentUser } = useSelector(state => state.auth)
    const { loading: loadingEmployee, employee, error: errorEmployee } = useSelector(state => state.employee)

    const [user, setUser] = useState({
        phone: '',
        category: '',
        subcategory: '',
        country: '',
        state: '',
        experience: '',
        availability: ''
    });

    const {
        phone,
        category,
        subcategory,
        country,
        state,
        experience,
        availability
    } = user;

    const [video, setVideo] = useState();

    let [subCategories, setSubCategories] = useState()

    let [mediaError, setMediaError] = useState({})

    const countriesList = Object.values(countries);

    useEffect(() => {
        console.log('current use: ', currentUser)
        console.log('match is:::::::', match)
        if (currentUser && currentUser.role === 'employee') {
            dispatch(loadEmployee(currentUser._id))
        } else if (currentUser && currentUser.role === 'admin' && match) {
            dispatch(loadEmployee(match.params.id))
        }
        dispatch(getAllCategoriesAndSubCategories())
    }, [currentUser])

    useEffect(() => {
        if (errorEmployee) {
            dispatch({ type: LOAD_EMPLOYEE_RESET })
            history.push('/admin/dashboard')
        }
    }, [errorEmployee])

    useEffect(() => {
        if (employee) {
            setUser(prev => (
                {
                    ...prev,
                    phone: employee.phone,
                    category: employee.category,
                    subcategory: employee.subcategory,
                    country: employee.country,
                    state: employee.state,
                    experience: employee.experience,
                    availability: employee.availability,
                }
            ))


        }
    }, [employee])

    useEffect(() => {
        if (allCategoriesAndSubCategories) {
            let listOfSubs
            let subCats = allCategoriesAndSubCategories.filter(cat => cat.parentId)
            let subCat = subCats.find(sub => sub.name === subcategory)

            if (subCat) {
                listOfSubs = allCategoriesAndSubCategories.filter(cat => cat.parentId === subCat.parentId)
            }

            setSubCategories(listOfSubs)
        }
    }, [allCategoriesAndSubCategories, employee])

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
        if (e.target.name === 'video') {
            if (e.target.files[0]) {
                if (e.target.files[0].type.split('/')[0] === 'video') {
                    setMediaError(prev => ({ ...prev, video: null }))

                } else {
                    setMediaError(prev => ({ ...prev, video: "Please upload an video file" }))
                }
            }

            setVideo(e.target.files[0])
        }

        else if (e.target.name === 'category') {
            const selectedCategory = allCategoriesAndSubCategories.find(category =>
                category._id === e.target.value
            )

            setUser(prev => ({
                ...prev, [e.target.name]: selectedCategory ? selectedCategory.name : ''
            }))

            setSubCategories(allCategoriesAndSubCategories && allCategoriesAndSubCategories.filter(category => category.parentId === e.target.value))
        }

        else {
            setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: UPDATE_CV_RESET })
        setMediaError({})
        const formData = new FormData()
        formData.set('_id', employee._id)
        formData.set('category', category)
        formData.set('subcategory', subcategory)
        formData.set('country', country)
        formData.set('phone', phone)
        formData.set('state', state)
        formData.set('experience', experience)
        formData.set('availability', availability)
        formData.set('video', video)

        dispatch(updateCv(formData))
        setVideo(null)
    };

    return (


        employee ? <div className="col-xl-9 col-lg-8 m-b30">
            <div className="job-bx job-profile">
                <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-dark">CV Information</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Phone:</label>
                                <input type="text" className="form-control" placeholder="Enter your phone" value={user.phone} onChange={handleChange} name='phone' />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>State:</label>
                                <input type="text" className="form-control" placeholder="Enter your state" value={user.state} onChange={handleChange} name='state' />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label htmlFor="country_field">
                                    Country *
                                </label>
                                <select
                                    id="country_field"
                                    className="form-control"
                                    value={country}
                                    name="country"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--- Select ---</option>
                                    {countriesList.map(country =>
                                        <option key={country.name}>{country.name}</option>
                                    )}
                                </select>
                                {error && error.country && <p className='text-danger mt-2'>{error.country}</p>}
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Choose category *</label>
                                <Form.Control as="select" custom className="custom-select" name='category' onChange={handleChange} required>
                                    <option value="">--- Select ---</option>
                                    {allCategoriesAndSubCategories && allCategoriesAndSubCategories.map(cat => (
                                        cat.parentId === null && <option key={cat._id} value={cat._id} selected={cat.name === employee.category}>{cat.name}</option>
                                    ))}
                                </Form.Control>

                                {error && error.category && <p className='text-danger mt-2'>{error.category}</p>}
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Choose Sub category *</label>
                                <Form.Control as="select" custom className="custom-select" name='subcategory' onChange={handleChange} required>
                                    <option value="">--- Select ---</option>
                                    {subCategories && subCategories.map(cat => (
                                        <option key={cat._id} value={cat.name} selected={cat.name === employee.subcategory}>{cat.name}</option>
                                    ))}
                                </Form.Control>

                                {error && error.subcategory && <p className='text-danger mt-2'>{error.subcategory}</p>}
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Years of experience</label>
                                <Form.Control as="select" custom className="custom-select" name='experience' onChange={handleChange}>
                                    <option value="">--- Select ---</option>
                                    <option value={1} selected={employee.experience === 1}>1</option>
                                    <option value={2} selected={employee.experience === 2}>2</option>
                                    <option value={3} selected={employee.experience === 3}>3</option>
                                    <option value={4} selected={employee.experience === 4}>4</option>
                                    <option value={5} selected={employee.experience === 5}>5</option>
                                    <option value={6} selected={employee.experience === 6}>6</option>
                                    <option value={7} selected={employee.experience === 7}>7</option>
                                    <option value={8} selected={employee.experience === 8}>8</option>
                                    <option value={9} selected={employee.experience === 9}>9</option>
                                    <option value={10} selected={employee.experience === 10}>10+</option>
                                </Form.Control>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Availability</label>
                                <Form.Control as="select" custom className="custom-select" name='availability' onChange={handleChange}>
                                    <option value="">--- Select ---</option>
                                    <option selected={employee.availability === 'Full time'}>Full time</option>
                                    <option selected={employee.availability === 'Part time'}>Part time</option>
                                    <option selected={employee.availability === 'Hourly'}>Hourly</option>
                                </Form.Control>
                            </div>
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="avatar_upload">
                            Upload new Video (video duration must not exceed 1 minute)
                        </label>
                        <div className="custom-file">
                            <input
                                type="file"
                                name="video"
                                className="custom-file-input"
                                id="customFile"
                                onChange={
                                    handleChange
                                }
                            />
                            <label
                                className="custom-file-label text-left"
                                htmlFor="customFile">
                                {(video && `${video.name.slice(0, 35)} ...`) || 'Choose video'}
                            </label>


                        </div>
                        {error && error.video && <p className='text-danger mt-2'>{error.video}</p>}
                        {mediaError.video && <p className='text-danger mt-2'>{mediaError.video}</p>}
                    </div>

                    <div className="text-left">
                        <button
                            type="submit"
                            disabled={loading || mediaError.avatar || mediaError.video ? true : false}
                            className="site-button"
                            style={{ opacity: loading || mediaError.avatar || mediaError.video ? '0.7' : '1', width: '100%' }}
                        >
                            {loading ? <>Please wait. It might take few minutes ... </> : 'UPDATE CV'}
                        </button>
                    </div>

                    {loading &&
                        <div className={classes.root}>
                            <LinearProgress />
                        </div>}
                </form>
            </div>
        </div>
            : <p></p>


    )
}

export default CvUpdate
