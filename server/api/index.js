const router = require('express').Router()

router.use('/todo', require('./todo'))

module.exports = router
