const router = require('express').Router()

router.use('/todo', require('./todo'))
router.use('/user', require('./user'))
router.use('/auth', require('./auth'))

module.exports = router
