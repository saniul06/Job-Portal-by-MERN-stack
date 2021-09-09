import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import { showAvatarPreview, updateProfile } from '../../actions/authActions'
import { UPDATE_PROFILE_RESET } from '../../actions/actionTypes'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '10px'
    },
}));

const ProfileUpdate = () => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const alert = useAlert()
    const firstMount = useRef(true)

    const { user } = useSelector(state => state.auth)
    const { loading, message, error } = useSelector(state => state.updateProfile)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }

        return () => {
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [user]);

    useEffect(() => {
        if (message) {
            alert.success(message)
        }
    }, [message])

    useEffect(() => {
        if (user) {
            if (name !== user.name || email !== user.email || avatar) {
                setIsUpdated(true)
            } else {
                setIsUpdated(false)
            }
        }
    }, [user])

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [isUpdated, setIsUpdated] = useState(false);

    // const isUpdated = name !== user.name || email !== user.email || avatar

    let [mediaError, setMediaError] = useState({})

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    if (reader.result.split('/')[0] === 'data:image') {
                        dispatch(showAvatarPreview(reader.result))
                        setMediaError(prev => ({ ...prev, avatar: null }))
                    } else {
                        setMediaError(prev => ({ ...prev, avatar: "Please upload an image file" }))

                    }
                    setAvatar(e.target.files[0]);
                }
            };
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }

        } else if (e.target.name === 'name') {
            setName(e.target.value)

        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: UPDATE_PROFILE_RESET })
        setMediaError({})
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))
        setAvatar()
    };
    return (
        <div className="col-xl-9 col-lg-8 m-b30">
            <div className="job-bx job-profile">
                <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase text-dark">Profile Information</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row m-b10">
                        <div className="form-group">
                            <label>Your Name:</label>
                            <input type="text" required className="form-control" value={name} onChange={handleChange} name='name' />
                            {error && error.name && <p className='text-danger mt-2'>{error.name}</p>}
                        </div>

                    </div>
                    <div className="row m-10">
                        <div className="form-group">
                            <label>Your email:</label>
                            <input type="email" required className="form-control" value={email} onChange={handleChange} name='email' />
                            {error && error.email && <p className='text-danger mt-2'>{error.email}</p>}
                        </div>

                    </div>
                    {user && user.role === 'employee' && (
                        <div className="form-group">
                            <label htmlFor="avatar_upload">
                                Avatar
                            </label>
                            <div className="d-flex align-items-center">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={
                                            handleChange
                                        }
                                    />
                                    <label
                                        className="custom-file-label text-left"
                                        htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>

                            </div>
                            {error && error.avatar && <p className='text-danger mt-2'>{error.avatar}</p>}
                            {mediaError.avatar && <p className='text-danger mt-2'>{mediaError.avatar}</p>}
                        </div>
                    )}
                    <button disabled={mediaError.avatar || !isUpdated ? true : false} className="site-button m-b30" style={{ opacity: mediaError.avatar || loading || !isUpdated ? '.5' : '1' }}>{loading ? "Please wait ..." : "Update"}</button>
                </form>
            </div>
        </div>
    )
}
export default ProfileUpdate;