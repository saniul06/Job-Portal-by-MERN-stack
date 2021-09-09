import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../actions/actionTypes'
import { updatePassword } from '../../actions/authActions'

const PasswordUpdate = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const { loading, message, error } = useSelector(state => state.updatePassword)

    useEffect(() => {
        if (message) {
            alert.success(message)
        }

    }, [message])

    useEffect(() => {
        return () => { dispatch({ type: UPDATE_PASSWORD_RESET }) }
    }, [])

    const handleChange = e => {
        setPassword(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (password.newPassword !== password.confirmNewPassword) {

        }
        dispatch({ type: UPDATE_PASSWORD_RESET })
        dispatch(updatePassword(password))
    }

    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="job-bx job-profile">
                <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-dark">Change Password</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Old Password</label>
                                <input type="password" name="oldPassword" className="form-control" value={password.oldPassword} onChange={handleChange} />

                                {error && error.oldPassword && <p className='text-danger mt-2'>{error.oldPassword}</p>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>New Password </label>
                                <input type="password" name="newPassword" className="form-control" value={password.newPassword} onChange={handleChange} />

                                {error && error.newPassword && <p className='text-danger mt-2'>{error.newPassword}</p>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="confirmNewPassword" className="form-control" value={password.confirmNewPassowrd} onChange={handleChange} />

                                {error && error.confirmNewPassword && <p className='text-danger mt-2'>{error.confirmNewPassword}</p>}
                            </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                            <button
                                disabled={loading ? true : false}
                                style={{ opacity: loading ? '0.7' : '1' }}
                                className="site-button">Update Password</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default PasswordUpdate
