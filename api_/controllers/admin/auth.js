const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../../models/admin')


const createAdmin = (req, res) => {
    let name = 'admin';
    let email = 'admin@gmail.com';
    let password = 'admin'
    Admin.findOne({ email: email })
        .then(admin => {
            if (admin) {
                res.status.json({
                    message: 'exist'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    const newAdmin = new Admin({
                        name: name,
                        email: email,
                        password: hash
                    })
                    newAdmin.save()
                        .then(data => {
                            res.status(201).json({
                                message: 'success'
                            })
                        })
                        .catch(err => {
                            res.status(501).json({
                                message: 'error'
                            })
                        })
                })
            }
        })
        .catch(err => {
            res.send({
                message: 'error',
                success: false
            })
        })
}


const adminLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    Admin.findOne({ email })
        .then(admin => {
            if (admin) {
                bcrypt.compare(password, admin.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: 'error'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({ _id: admin._id }, 'SECRET',
                            { expiresIn: '24h' })
                        res.json({
                            message: 'success',
                            token,
                            id: admin._id
                        })
                    } else {
                        res.json({
                            message: 'error'
                        })
                    }
                })

            } else {
                res.json({
                    message: 'error'
                })
            }
        })
        .catch(err => {
            res.json({
                message: 'error'
            })
        })
}


const loggedAdminInfo = (req, res) => {
    Admin.findOne({ _id: req.params.id })
        .then(admin => {
            res.json({
                admin
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


const getAllAdmin = (req, res) => {
    Admin.find({}, { name: 1 }).sort({ _id: -1 })
        .then(admins => {
            res.json({
                admins
            })
        })
        .catch(err => {
            if (err) {
                res.send(err)
            }
        })
}


const totalAdminCount = (req, res) => {
    Admin.count()
        .then(totaladmin => {
            res.json({
                totaladmin
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


const updateAdmin = (req, res) => {
    Admin.findOne({ email: req.body.email })
        .then(admin => {
            if (admin) {
                let name = req.body.name;
                let email = req.body.email;

                Admin.findOneAndUpdate({ email: email },
                    { $set: { "name": name } })
                    .then(data => {
                        res.status(201).json({
                            message: 'success'
                        })
                    })
                    .catch(err => {
                        res.status(501).json({
                            message: 'error'
                        })
                    })
            }
        })
}

const updateAdminPassword = (req, res) => {
    Admin.findOne({ email: req.body.email })
        .then(admin => {
            if (admin) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    let email = req.body.email;
                    Admin.findOneAndUpdate({ email: email },
                        { $set: { "password": hash } })
                        .then(data => {
                            res.status(201).json({
                                message: 'success'
                            })
                        })
                        .catch(err => {
                            res.status(501).json({
                                message: 'error'
                            })
                        })

                })
            }
        })
}

module.exports = {
    createAdmin,
    adminLogin,
    loggedAdminInfo,
    getAllAdmin,
    totalAdminCount,
    updateAdmin,
    updateAdminPassword
}