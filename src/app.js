const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const router = require('./api/router')

const app = express()

app.use(express.json())

app.use(cors())

require('./config/config-passport')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))

app.use('/api/users', router)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/users',
    data: 'Not found',
  })
})

app.use((err, _, res, __) => {
  console.log(err.stack)
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})

module.exports = app
