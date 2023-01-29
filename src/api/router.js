const express = require('express')
const ctrlAuth = require('../controller/auth')
const ctrlContact = require('../controller/controller')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/singup', ctrlAuth.singUpUser)

router.post('/login', ctrlAuth.singInUser)

router.post('/logout', auth, ctrlAuth.singOutUser)

router.get('/current', auth, ctrlAuth.currentUser)

router.get('/contacts', auth, ctrlContact.get)

router.get('/contacts/:id', auth, ctrlContact.getById)

router.post('/contacts', auth, ctrlContact.create)

router.put('/contacts/:id', auth, ctrlContact.update)

router.patch('/contacts/:id', auth, ctrlContact.updateStatus)

router.delete('/contacts/:id', auth, ctrlContact.remove)

module.exports = router
