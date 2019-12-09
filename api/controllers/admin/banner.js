const multer = require('multer')
const Banner = require('../../models/banner')

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/banner')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname)
    }
});
var upload = multer({ storage: store }).single('file')


const createBanner = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        const newBanner = new Banner({
            file: req.file.filename
        })
        newBanner.save()
            .then(data => {
                if (data) {
                    res.status(200).json({
                        success: true
                    })
                }
            })
            .catch(err => {
                res.status(501).json({
                    success: false
                })
            })
    })
}


const getBanners = (req, res) => {
    Banner.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                images: docs.map(doc => {
                    return {
                        content: doc.content,
                        id: doc._id,
                        file: "http://35.171.18.185:3000/uploads/banner/" + doc.file
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


const removeSingleBanner = (req, res) => {
    Banner.findByIdAndRemove({ _id: req.params.id })
        .then(data => {
            res.status(204).json({
                success: true
            })
        })
        .catch(err => {
            if (err) {
                res.status(501).json({
                    success: false
                })
            }
        })
}

module.exports = {
    createBanner,
    getBanners,
    removeSingleBanner
}