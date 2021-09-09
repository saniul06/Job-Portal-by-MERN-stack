const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')

const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)

oauth2client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})

exports.uploadImage = (avatar, myImage, res) => {
    return new Promise(resolve => {

        // at first upload avatar to backend server
        avatar.mv(`./uploads/${avatar.name}`, async (err) => {
            if (err) {
                console.log(err)
                return
            }

            try {
                const filepath = path.join(__dirname, `../../uploads/${avatar.name}`)

                // start uploading avatar backend server to google drive
                var response = await drive.files.create({
                    requestBody: {
                        name: avatar.name,
                        mimeType: avatar.mimetype
                    },
                    media: {
                        mimeType: avatar.mimetype,
                        body: fs.createReadStream(filepath)
                    }
                })

            } catch (err) {
                console.log(err)
                return res.status(500).json({
                    errorMessage: "Internal server error"
                })
            }

            // remove avatar from backend server
            fs.unlink(`./uploads/${avatar.name}`, err => {
                if (err) {
                    console.log(err)
                    return
                }
            })

            //generate url for avatar
            try {
                const imageId = response.data.id
                await drive.permissions.create({
                    fileId: imageId,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone'
                    }
                })

                const result = await drive.files.get({
                    fileId: imageId,
                    fields: 'webViewLink, webContentLink'
                })

                myImage.webContentLink = result.data.webContentLink
                myImage.webViewLink = result.data.webViewLink
                myImage.avatarId = imageId

            } catch (err) {
                console.log(err)
                res.status(500).json({
                    errorMessage: 'Internal server error'
                })
            }

            resolve()
        })
    })
}

exports.uploadVideo = (video, myVideo, res) => {
    return new Promise(resolve => {

        // at first upload video to backend server
        video.mv(`./uploads/${video.name}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    errorMessage: "Internal server error"
                })
            }

            try {
                const filepath = path.join(__dirname, `../../uploads/${video.name}`)

                // start uploading video backend server to google drive
                var response = await drive.files.create({
                    requestBody: {
                        name: video.name,
                        mimeType: video.mimetype
                    },
                    media: {
                        mimeType: video.mimetype,
                        body: fs.createReadStream(filepath)
                    }
                })

            } catch (err) {
                console.log(err)
                return res.status(500).json({
                    errorMessage: "Internal server error"
                })
            }

            // remove video from backend server
            fs.unlink(`./uploads/${video.name}`, err => {
                if (err) {
                    console.log(err)
                    return
                }
            })

            // generate url for video
            try {
                const videoId = response.data.id
                await drive.permissions.create({
                    fileId: videoId,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone'
                    }
                })
                const result = await drive.files.get({
                    fileId: videoId,
                    fields: 'webViewLink, webContentLink'
                })

                myVideo.webContentLink = result.data.webContentLink
                myVideo.webViewLink = result.data.webViewLink
                myVideo.videoId = videoId

            } catch (err) {
                console.log(err)
                res.status(500).json({
                    errorMessage: "Internal server error"
                })
            }

            resolve()
        })
    })
}

exports.deleteMedia = (fileId, res) => {
    return new Promise(async resolve => {
        try {
            const response = await drive.files.delete({
                fileId
            })

            console.log('delted successful: ', response.status)


        } catch (err) {
            console.log(err)
            return res.status(500).json({
                errorMessage: "Internal server error"
            })
        }

        resolve()
    })
}
