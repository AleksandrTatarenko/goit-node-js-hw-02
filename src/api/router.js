const express = require('express')
const ctrlAuth = require('../controller/auth')
const ctrlContact = require('../controller/contacts')
const middlewares = require('../middlewares/middlewares')
const ctrlUser = require('../controller/user')

const router = express.Router()

router.post('/singup', ctrlAuth.singUpUser)

router.post('/login', ctrlAuth.singInUser)

router.post('/logout', middlewares.auth, ctrlAuth.singOutUser)

router.get('/current', middlewares.auth, ctrlAuth.currentUser)

router.get('/contacts', middlewares.auth, ctrlContact.get)

router.get('/contacts/:id', middlewares.auth, ctrlContact.getById)

router.post('/contacts', middlewares.auth, ctrlContact.create)

router.put('/contacts/:id', middlewares.auth, ctrlContact.update)

router.patch('/contacts/:id', middlewares.auth, ctrlContact.updateStatus)

router.delete('/contacts/:id', middlewares.auth, ctrlContact.remove)

router.patch('/avatars', middlewares.auth, middlewares.upload.single("avatar"), ctrlUser.uploadAvatar);

module.exports = router
