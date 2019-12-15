const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/authenticate')
const AdminAuthControllers = require('../controllers/admin/auth')
const BannerControllers = require('../controllers/admin/banner')
const TeamControllers = require('../controllers/admin/team')
const NewsControllers = require('../controllers/admin/news')
const SocialControllers = require('../controllers/admin/social')



router.get('/create-admin', AdminAuthControllers.createAdmin)
router.post('/login-admin', AdminAuthControllers.adminLogin)
router.get('/logged-admin/:id', Authenticate, AdminAuthControllers.loggedAdminInfo)
router.get('/all-admin', AdminAuthControllers.getAllAdmin)
router.get('/total-admin', Authenticate, AdminAuthControllers.totalAdminCount)
router.patch('/update-admin', Authenticate, AdminAuthControllers.updateAdmin)
router.patch('/update-password', AdminAuthControllers.updateAdminPassword)

router.post('/add-banner', Authenticate, BannerControllers.createBanner)
router.get('/get-banners', Authenticate, BannerControllers.getBanners)
router.delete('/remove-banner/:id', Authenticate, BannerControllers.removeSingleBanner)


router.post('/add-team', Authenticate, TeamControllers.createTeam)
router.get('/get-team', Authenticate, TeamControllers.getTeams)
router.delete('/remove-team/:id', Authenticate, TeamControllers.removeSingleTeam)
router.get('/total-team', Authenticate, TeamControllers.totalTeamCount)
router.get('/single-team/:id', Authenticate, TeamControllers.getSingleTeamById)
router.patch('/update-team', Authenticate, TeamControllers.teamUpdate)

router.post('/add-news', Authenticate, NewsControllers.createNews)
router.get('/get-news', Authenticate, NewsControllers.getNews)
router.delete('/remove-news/:id', Authenticate, NewsControllers.removeSingleNews)
router.get('/total-news', Authenticate, NewsControllers.totalNewsCount)
router.get('/single-news/:id', Authenticate, NewsControllers.getSingleNewsById)
router.patch('/update-news', Authenticate, NewsControllers.newsUpdate)


router.get('/save-social', SocialControllers.setSocial)
router.get('/get-social', Authenticate, SocialControllers.getSocialLinks)
router.patch('/striming-update', Authenticate, SocialControllers.strimingUpdate)
router.patch('/facebook-update', Authenticate, SocialControllers.facebookUpdate)
router.patch('/instagram-update', Authenticate, SocialControllers.instagramUpdate)
router.patch('/discord-update', Authenticate, SocialControllers.discordUpdate)
router.patch('/youtube-update', Authenticate, SocialControllers.youtubeUpdate)



module.exports = router