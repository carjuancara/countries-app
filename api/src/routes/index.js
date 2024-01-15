const router = require('express').Router()
const countryRouter = require('./countryRouter.js')
const activityRouter = require('./activityRouter.js')

const Express = require('express')

router.use(Express.json())

router.use('/countries', countryRouter)
router.use('/activities', activityRouter)

module.exports = router
