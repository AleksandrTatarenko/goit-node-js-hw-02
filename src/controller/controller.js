const service = require('../services/contacts')

const get = async (req, res, next) => {
  const { username } = req.user
  try {
    const results = await service.getAllContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        message: `Authorization was successful: ${username}`,
        contacts: results,
      },
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await service.getContactById(id)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const create = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  try {
    const result = await service.createContact({ name, email, phone, favorite })
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone, favorite } = req.body
  try {
    const result = await service.updateContact(id, { name, email, phone, favorite })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const { favorite } = req.body

  if (!favorite) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: "missing field favorite",
      data: 'Not Found',
    })
  } else {
    try {
      const result = await service.updateContact(id, { favorite })
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found contact id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await service.removeContact(id)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
}
