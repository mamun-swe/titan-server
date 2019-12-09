const multer = require('multer')
const Team = require('../../models/team')

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/team')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname)
    }
});
var upload = multer({ storage: store }).single('file')


const createTeam = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        const newTeam = new Team({
            name: req.body.name,
            about: req.body.about,
            file: req.file.filename,
            date: Date.now()
        })
        newTeam.save()
            .then(data => {
                if (data) {
                    res.status(200).json({
                        success: true
                    })
                }
            })
            .catch(err => {
                if (err) {
                    res.status(501).json({
                        success: false
                    })
                }
            })
    })
}


const getTeams = (req, res) => {
    Team.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                images: docs.map(doc => {
                    return {
                        content: doc.content,
                        id: doc._id,
                        name: doc.name,
                        about: doc.about,
                        file: "http://35.171.18.185:3000/uploads/team/" + doc.file,
                        date: doc.date
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


const removeSingleTeam = (req, res) => {
    Team.findByIdAndRemove({ _id: req.params.id })
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

const totalTeamCount = (req, res) => {
    Team.count()
        .then(team => {
            res.json({
                team
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

const getSingleTeamById = (req, res) => {
    Team.findById({ _id: req.params.id }, { file: 0 })
        .then(team => {
            res.json({
                team
            })
        })
        .catch(err => {
            res.json({
                message: "error"
            })
        })
}

const teamUpdate = (req, res) => {
    Team.findByIdAndUpdate({ _id: req.body._id }, {
        $set: {
            'name': req.body.name,
            'about': req.body.about
        }
    })
        .then(data => {
            res.json({
                message: "success"
            })
        })
        .catch(err => {
            res.json({
                message: "error"
            })
        })
}

module.exports = {
    createTeam,
    getTeams,
    removeSingleTeam,
    totalTeamCount,
    getSingleTeamById,
    teamUpdate
}