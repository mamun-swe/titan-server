const Banner = require('../../models/banner')
const Company = require('../../models/companies')
const News = require('../../models/news')
const Team = require('../../models/team')


// Banner / Sliders
const allBanner = (req, res) => {
    Banner.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                sliders: docs.map(doc => {
                    return {
                        file: "https://dashboard.heroku.com/uploads/banner/" + doc.file
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

// Sponsored Company
const allCompany = (req, res) => {
    Company.find().sort({ _id: -1 })
        .then(docs => {
            const response = {
                companies: docs.map(doc => {
                    return {
                        link: doc.link,
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
                        file: "http://localhost:3000/uploads/news/" + doc.file
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
                        file: "http://localhost:3000/uploads/news/" + doc.file
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
                    file: "http://localhost:3000/uploads/news/" + docs.file

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
                        file: "http://localhost:3000/uploads/team/" + doc.file
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
                        file: "http://localhost:3000/uploads/team/" + doc.file
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
                    file: "http://localhost:3000/uploads/team/" + docs.file

                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}



module.exports = {
    allBanner,
    allCompany,
    lastFourNews,
    allNews,
    readSingleNews,
    lasteNineTeam,
    allTeam,
    getSingleTeam
}