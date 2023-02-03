const fs = require('fs/promises');
const path = require('path');
const User = require('../services/schemas/user');
const Jimp = require('jimp');
const sendEmail = require('../services/verification');

const uploadAvatar = async (req, res, next) => {
  const { filename } = req.file;

  await Jimp.read(filename)
  .then(avatar => {
    return avatar
      .resize(250, 250)
      .write(filename)
  })
  .catch(err => {
    console.error(err);
  });

  const oldPath = path.resolve(__dirname, "../tmp", filename);
  const newPath = path.resolve(__dirname, "../public/avatars", filename);

  try {
    await fs.rename(oldPath, newPath);
  } catch (error) {
    await fs.unlink(oldPath);
    throw error;
  }

  const { user } = req;
  const { _id } = user;

  const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL: newPath }, { new: true });

  return res.json({
    data: {
        avatar: updatedUser.avatarURL
      }
    })
}

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  
  try {
    const verifiedUser = await User.findOneAndUpdate(verificationToken, { verify: true, verificationToken: null }, { new: true });

    if (verifiedUser) {
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Verification successful!',
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found!',
      });
    };
  } catch (e) {
    console.log(e);
    next(e);
  };
};

const againVerifyUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      status: "bad request",
      code: 400,
      message: "Missing required field email!"
    });
  } else {
    const user = await User.findOne(email);

    if (user.verify) {
      res.status(400).json({
        status: "bad request",
        code: 400,
        message: "Verification has already been passed"
      })
    } else {
      sendEmail(email, user.verificationToken);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Verification email sent"
      });
    }
  }
};

module.exports = {
  uploadAvatar,
  verifyUser,
  againVerifyUser
}