const router = require('express').Router()
const { sequelize } = require('../util/db')
const { Blog } = require("../models");
const { User } = require('../models')
const { errorHandler, authVerification } = require('../util/middleware')

router.get('/', async (req, res) => {
  const users = await User.findAll({
  include: {
    model: Blog,
    attributes: ['title']
  }
  })


  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', authVerification, async (req, res) => {
  const user = await sequelize.query(`UPDATE users SET username='${req.body.newUsername}' WHERE username='${req.params.username}'`,
    {
      model: User,
    })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router