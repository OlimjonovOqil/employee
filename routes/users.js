const express = require('express')
const router = express.Router()
const { login, current, register } = require('../controllers/users')
const { auth } = require('../middleware/auth')

router.post('/login', login)
router.post('/register', register)
router.get('/current', auth, current)

module.exports = router
