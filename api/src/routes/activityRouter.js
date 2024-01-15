const { Router } = require('express')
const { getActivities, newActivities } = require('../handler/activitiesHandler')
const activityRouter = Router()

activityRouter.get('/', getActivities)
activityRouter.post('/', newActivities)
module.exports = activityRouter
