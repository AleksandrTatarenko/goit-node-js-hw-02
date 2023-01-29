const fs = require('fs/promises')
const path = require('path')
const User = require('../services/schemas/user')
var Jimp = require('jimp');

const uploadAvatar = async (req, res, next) => {
  const { filename } = req.file;
  console.log(req.file)
  const oldPath = path.resolve(__dirname, "../tmp", filename);
  const newPath = path.resolve(__dirname, "../public/avatars", filename);
  try {
    await fs.rename(oldPath, newPath);
  } catch (error) {
    await fs.unlink(oldPath);
    throw error;
  }

  await Jimp.read(newPath)
  .then(avatar => {
    return avatar
      .resize(250, 250)
  })
  .catch(err => {
    console.error(err);
  });

  const { user } = req
  const { _id } = user

  await User.findByIdAndUpdate(_id, { avatarURL: newPath })

  const updatedUser = await User.findById(_id)

  return res.json({
    data: {
        avatar: updatedUser.avatarURL
      }
    })
}

module.exports = {
    uploadAvatar,
}