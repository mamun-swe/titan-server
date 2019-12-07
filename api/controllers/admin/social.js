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



module.exports = {
    getSocialLinks
}