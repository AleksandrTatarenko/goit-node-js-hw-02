const app = require('./src/app')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

require('dotenv').config()

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful")
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
  )