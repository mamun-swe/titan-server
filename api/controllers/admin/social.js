const Social = require('../../models/social')

const getSocialLinks = (req, res) => {
    Social.find()
        .then(data => {
            if (data) {
                res.status(200).json({
                    data
                })
            }
        })
        .catch(err => {
            if (err) {
                res.status(204).json({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}

const strimingUpdate = (req, res) => {
    let id = req.body._id;
    Social.updateOne({ _id: id },
        {
            $set: {
                'striming': req.body.striming
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'ok'
                })
            }
        })
        .catch(err => {
            if (err) {
                res.send({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}

const facebookUpdate = (req, res) => {
    let id = req.body._id;
    Social.updateOne({ _id: id },
        {
            $set: {
                'facebook': req.body.facebook
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'ok'
                })
            }
        })
        .catch(err => {
            if (err) {
                res.send({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}

const instagramUpdate = (req, res) => {
    let id = req.body._id;
    Social.updateOne({ _id: id },
        {
            $set: {
                'instagram': req.body.instagram
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'ok'
                })
            }
        })
        .catch(err => {
            if (err) {
                res.send({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}

const discordUpdate = (req, res) => {
    let id = req.body._id;
    Social.updateOne({ _id: id },
        {
            $set: {
                'discord': req.body.discord
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'ok'
                })
            }
        })
        .catch(err => {
            if (err) {
                res.send({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}

const youtubeUpdate = (req, res) => {
    let id = req.body._id;
    Social.updateOne({ _id: id },
        {
            $set: {
                'youtube': req.body.youtube
            }
        })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'ok'
                })
            }
        })
        .catch(err => {
            if (err) {
                res.send({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}



module.exports = {
    getSocialLinks,
    strimingUpdate,
    facebookUpdate,
    instagramUpdate,
    discordUpdate,
    youtubeUpdate
}