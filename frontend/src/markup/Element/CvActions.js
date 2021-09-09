import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import { useAlert } from 'react-alert'
import CancelSharpIcon from '@material-ui/icons/CancelSharp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { approveOrDisapprove, activateOrDeactivate } from '../../actions/adminActions'

const CvActions = ({ index,
    cv,
    deleteLocalVideoShow,
    instagramVideoShow,
    sendEmailShow,
    profileShow,
    deleteProfileShow
}) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const [isApproved, setIsApproved] = useState(cv.isApproved)
    const [isActivated, setIsActivated] = useState(cv.isActivated)

    useEffect(() => {
        setIsApproved(cv.isApproved)
        setIsActivated(cv.isActivated)
    }, [cv.isApproved, cv.isActivated])

    const handleCvStatus = (type, _id) => {
        const formData = new FormData()
        formData.set('_id', _id)
        if (type === 'approve') {
            dispatch(approveOrDisapprove(formData, setIsApproved))
        } else {
            dispatch(activateOrDeactivate(formData, setIsActivated))
        }
    }

    return (
        <tr key={index}>
            <td className={`date td-width-100 ${isApproved ? 'text-success' : 'text-danger'}`}>{isApproved ? <CheckCircleSharpIcon /> : <CancelSharpIcon />}</td>
            <td className={`date td-width-100 ${isActivated ? 'text-success' : 'text-danger'}`}>{isActivated ? <CheckCircleSharpIcon /> : <CancelSharpIcon />}</td>
            <td className="video td-width-200">
                <a href={cv.video.webViewLink} target="_blank" title='View Video'>
                    <VisibilityIcon /></a>
                <a href={cv.video.webContentLink} title="Download Video"><GetAppIcon /></a>
                <a onClick={() => deleteLocalVideoShow(cv._id)} className='text-danger' style={{ cursor: 'pointer' }} title="Delete Video"><DeleteIcon /></a>
                <Link to={'#'} data-toolge="modal" title="Add Twitter Video Link" onClick={() => instagramVideoShow(cv._id, cv.video.instagramLink)}><VideoCallIcon /></Link>
            </td>
            <td className="job-links button-group">
                <Button variant="outlined" size="small" color="primary" title='Send Email' onClick={() => sendEmailShow(cv.userId.name, cv.userId.email)}>
                    Email
                </Button>
                <Button variant="outlined" size="small" color="primary" title='View Cv' onClick={() => profileShow(cv)}>
                    View
                </Button>
                <Link to={`/admin/employee/update/${cv.userId._id}`}><Button variant="outlined" size="small" color="primary" title='Update Cv'>
                    Update
                </Button></Link>
                <Button variant="outlined" size="small" color="primary" title='Delete Cv' onClick={() => deleteProfileShow(cv.userId)}>
                    Delete
                </Button>
                <Button onClick={() => handleCvStatus('approve', cv._id)} variant="outlined" size="small" color="primary" title='Change Status'>
                    {isApproved ? 'Disapprove' : 'Approve'}
                </Button>
                <Button onClick={() => handleCvStatus('activate', cv._id)} variant="outlined" size="small" color="primary" title='Change Status'>
                    {isActivated ? 'Deactivate' : 'Activate'}
                </Button>
            </td>
        </tr>
    )
}

export default CvActions
