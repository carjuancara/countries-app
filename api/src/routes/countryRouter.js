const { Router } = require('express')
const { getCountries, getCountriesById } = require('../handler/countriesHandler')
const countryRouter = Router()

countryRouter.get('/', getCountries)
countryRouter.get('/:idCountry', getCountriesById)
module.exports = countryRouter
