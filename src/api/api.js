const express = require('express')
const router = express.Router()
const ctrlContact = require('../controller/controller')

router.get('/contacts', ctrlContact.get)

router.get('/contacts/:id', ctrlContact.getById)

router.post('/contacts', ctrlContact.create)

router.put('/contacts/:id', ctrlContact.update)

router.patch('/contacts/:id', ctrlContact.updateStatus)

router.delete('/contacts/:id', ctrlContact.remove)

module.exports = router
