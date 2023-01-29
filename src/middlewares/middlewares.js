const passport = require('passport')

const multer = require('multer')
const path = require('path')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = path.resolve(__dirname, '../tmp')
    cb(null, dirPath)
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname)
  }
})

const upload = multer({
  storage,
})

module.exports = {
  auth,
  upload
}
