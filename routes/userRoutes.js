const express = require('express')
const router = express.Router();
const { register, login, getUserData } = require('../controllers/userController')
const { protected } = require('../middlewares/authMiddleware')


router.post('/signup', register)
router.post('/login', login)
router.get('/me', protected, getUserData)

module.exports = router;