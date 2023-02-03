const jwt = require('jsonwebtoken');
const User = require('../services/schemas/user');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const secret = process.env.SECRET;
const sendEmail = require('../services/verification');

const singInUser = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Incorrect login or password',
      data: 'Bad request',
    })
  }

  const payload = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1h' })

  await User.updateOne({email: email}, {token: token})

  res.json({
    status: 'success',
    code: 200,
    data: {
        token: token
    },
  })
}

const singUpUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    })
  }
  try {
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = new User({ email, avatarURL, verificationToken });

    newUser.setPassword(password);
    await newUser.save();

    sendEmail(email, verificationToken);

    const verifiedUser = await User.findOne({email});

    if (verifiedUser.verify) {
      await User.findOneAndUpdate({email}, { username: username });
    }

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
      },
    })
  } catch (error) {
    next(error)
  }
}

const singOutUser = async (req, res, next) => {
  const { _id, email } = req.user;
  await User.findByIdAndUpdate({ _id }, { token: null });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      message: `${email} sing out!`,
    }
  })
  next()
}

const currentUser = async (req, res, next) => {
  const { user } = req
  const { email, subscription } = user
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email, 
        subscription
      },
    }
  })
  next()
}

module.exports = {
    singInUser,
    singUpUser,
    singOutUser,
    currentUser
}