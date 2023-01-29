const fs = require('fs/promises')
const path = require('path')
const User = require('../services/schemas/user')
const Jimp = require('jimp');

const uploadAvatar = async (req, res, next) => {
  const { filename } = req.file;
  console.log(req.file)

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

  const { user } = req
  const { _id } = user

  const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL: newPath }, {new: true})

  return res.json({
    data: {
        avatar: updatedUser.avatarURL
      }
    })
}

module.exports = {
    uploadAvatar,
}