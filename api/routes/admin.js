const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/authenticate')
const AdminAuthControllers = require('../controllers/admin/auth')
const BannerControllers = require('../controllers/admin/banner')
const CompanyControllers = require('../controllers/admin/company')
const TeamControllers = require('../controllers/admin/team')
const NewsControllers = require('../controllers/admin/news')



router.post('/create-admin', AdminAuthControllers.createAdmin)
router.post('/login-admin', AdminAuthControllers.adminLogin)
router.get('/logged-admin/:id', Authenticate, AdminAuthControllers.loggedAdminInfo)
router.get('/all-admin', AdminAuthControllers.getAllAdmin)
router.get('/total-admin', Authenticate, AdminAuthControllers.totalAdminCount)
router.patch('/update-admin', Authenticate, AdminAuthControllers.updateAdmin)
router.patch('/update-password', AdminAuthControllers.updateAdminPassword)

router.post('/add-banner', Authenticate, BannerControllers.createBanner)
router.get('/get-banners', Authenticate, BannerControllers.getBanners)
router.delete('/remove-banner/:id', Authenticate, BannerControllers.removeSingleBanner)

router.post('/add-company', Authenticate, CompanyControllers.createCompanie)
router.get('/get-companies', Authenticate, CompanyControllers.getCompanies)
router.delete('/remove-company/:id', Authenticate, CompanyControllers.removeSingleCompany)
router.get('/total-company', Authenticate, CompanyControllers.totalCompanyCount)

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
router.put('/update-news', Authenticate, NewsControllers.newsUpdate)



module.exports = router