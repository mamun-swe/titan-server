const multer = require('multer')
const Company = require('../../models/companies')

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/company')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname)
    }
});
var upload = multer({ storage: store }).single('file')


const createCompanie = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        const newCompany = new Company({
            link: req.body.link,
            file: req.file.filename
        })
        newCompany.save()
            .then(data => {
                res.status(201).json({
                    success: true
                })
            })
            .catch(err => {
                res.status(501).json({
                    success: false
                })
            })
    })
}


const getCompanies = (req, res) => {
    Company.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                images: docs.map(doc => {
                    return {
                        content: doc.content,
                        id: doc._id,
                        file: "http://localhost:3000/uploads/company/" + doc.file
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


const removeSingleCompany = (req, res) => {
    Company.findByIdAndRemove({ _id: req.params.id })
        .then(data => {
            res.status(200).json({
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


const totalCompanyCount = (req, res) => {
    Company.count()
        .then(company => {
            res.json({
                company
            })
        })
        .catch(err => {
            if (err) {
                res.status(501).json({
                    message: 'error',
                    errMessage: err
                })
            }
        })
}

module.exports = {
    createCompanie,
    getCompanies,
    removeSingleCompany,
    totalCompanyCount
}