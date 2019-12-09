const Banner = require('../../models/banner')
const News = require('../../models/news')
const Team = require('../../models/team')
const Social = require('../../models/social')
var nodemailer = require('nodemailer')


// Banner / Sliders
const allBanner = (req, res) => {
    Banner.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                sliders: docs.map(doc => {
                    return {
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


// News
const lastFourNews = (req, res) => {
    News.find().sort({ _id: -1 }).limit(4)
        .then(docs => {
            const response = {
                news: docs.map(doc => {
                    return {
                        id: doc._id,
                        date: doc.date,
                        title: doc.title,
                        content: doc.content,
                        file: "http://35.171.18.185:3000/uploads/news/" + doc.file
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


const allNews = (req, res) => {
    News.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                news: docs.map(doc => {
                    return {
                        id: doc._id,
                        date: doc.date,
                        title: doc.title,
                        content: doc.content,
                        file: "http://35.171.18.185:3000/uploads/news/" + doc.file
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


const readSingleNews = (req, res) => {
    News.findOne({ _id: req.params.id })
        .then(docs => {
            if (docs) {
                res.status(200).json({
                    date: docs.date,
                    title: docs.title,
                    content: docs.content,
                    file: "http://35.171.18.185:3000/uploads/news/" + docs.file

                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


// Team
const lasteNineTeam = (req, res) => {
    Team.find().sort({ _id: -1 }).limit(9)
        .then(docs => {
            const response = {
                teams: docs.map(doc => {
                    return {
                        id: doc._id,
                        name: doc.name,
                        about: doc.about,
                        file: "http://35.171.18.185:3000/uploads/team/" + doc.file
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


const allTeam = (req, res) => {
    Team.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                teams: docs.map(doc => {
                    return {
                        id: doc._id,
                        name: doc.name,
                        about: doc.about,
                        file: "http://35.171.18.185:3000/uploads/team/" + doc.file
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


const getSingleTeam = (req, res) => {
    Team.findOne({ _id: req.params.id })
        .then(docs => {
            if (docs) {
                res.status(200).json({
                    name: docs.name,
                    about: docs.about,
                    file: "http://35.171.18.185:3000/uploads/team/" + docs.file

                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}


// Social links
const getSocialLinks = (req, res) => {
    Social.find()
    .then(links => {
        res.status(200).json({
            links
        })
    })
    .catch(err => {
        if(err) {
            res.send({
                message: 'error'
            })
        }
    })
}


// Message send

const mailSend = (req, res, next) => {

    const output = `
        <h3>Name: ${req.body.name}</h3>
        <p><strong>Message:</strong> ${req.body.message}</p>
        <h4>Click to reply ${req.body.email}</h4>
        `;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: 'mhmamun166009@gmail.com',
            pass: '1118964208'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: req.body.email,
        to: 'mhmamun166009@gmail.com',
        subject: 'Client Message',
        text: 'Active Your Account?',
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).json({
            message: 'success',
        })
    });

}

module.exports = {
    allBanner,
    lastFourNews,
    allNews,
    readSingleNews,
    lasteNineTeam,
    allTeam,
    getSingleTeam,
    getSocialLinks,
    mailSend
}