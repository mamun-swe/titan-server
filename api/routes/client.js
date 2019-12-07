const express = require('express')
const router = express.Router()
const UserContrllers = require('../controllers/user/user')


router.get('/sliders', UserContrllers.allBanner)
router.get('/companies', UserContrllers.allCompany)
router.get('/four-news', UserContrllers.lastFourNews)
router.get('/all-news', UserContrllers.allNews)
router.get('/read-news/:id', UserContrllers.readSingleNews)
router.get('/nine-team', UserContrllers.lasteNineTeam)
router.get('/all-team', UserContrllers.allTeam)
router.get('/single-team/:id', UserContrllers.getSingleTeam)
router.get('/social-links', UserContrllers.getSocialLinks)


module.exports = router