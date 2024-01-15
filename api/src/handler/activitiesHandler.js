const { Activity } = require('../db')

const getActivities = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body
  try {
    const newTouristActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season
    })
    await newTouristActivity.setCountries(countries)
    res.status(201).json(newTouristActivity)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

const newActivities = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body
  try {
    const newTouristActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season
    })
    await newTouristActivity.setCountries(countries)
    res.status(201).json(newTouristActivity)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

module.exports = { getActivities, newActivities }
