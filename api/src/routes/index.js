const axios = require('axios')
const router = require('express').Router()

const Express = require('express')
const { Op } = require('sequelize')
const { Country, Activity } = require('../db.js')

router.use(Express.json())
const cleanedCountries = (paises) => paises.map((p) => {
  // eng: function that filters the data, keeping only the necessary
  // esp: funcion que filtra los datos, manteniendo solo los necesarios
  return {
    id: p.cca3 ? p.cca3 : p.cioc,
    name: p.name.common.toLowerCase(),
    flags: p.flags[1],
    continents: p.continents[0],
    capital: p.capital ? p.capital[0] : p.name.common,
    subregion: p.subregion ? p.subregion : p.continents[0],
    area: p.area,
    population: p.population
  }
})

let flag = false
function validateStr (str) {
  // eng: function that checks if a STRING has numbers
  // esp: función que comprueba si una STRING tiene numeros
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const id = str.split('')
  let i = 0
  while (i <= 9 && flag === false) {
    if (id.includes(numbers[i].toString())) {
      flag = true
    } else {
      i++
      flag = false
    }
  }
}

router.get('/countries', async (req, res) => {
  // esp:trae todos los paises
  // eng:bring all the countries
  const { name } = req.query
  try {
    if (!name) {
      const infoCleaned = await Country.findAll()
      if (infoCleaned.length === 0) {
        const countries = (await axios('https://restcountries.com/v3/all')).data
        const infoCleaned = cleanedCountries(countries)
        await Country.bulkCreate(infoCleaned)
      }
      return res.status(200).json(infoCleaned)
    } else {
      const search = name.toLowerCase()
      const findCountries = await Country.findAll({
        where: {
          name: { [Op.substring]: search }
        }
      })
      if (findCountries.length === 0) {
        res.status(400).json({ message: `No se encontraron coincidencias con: ${search}` })
      }
      res.status(200).json(findCountries)
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
// eng: brings the detail of a country by ID
// esp: trae el detalle de un pais por ID
router.get('/countries/:idCountry', async (req, res) => {
  const { idCountry } = req.params

  try {
    if (idCountry.length !== 3) return res.status(400).json({ Error: 'The country ID must be 3 letters' })
    validateStr(idCountry)
    if (flag) return res.status(400).json({ error: 'ID cannot contain numbers' })
    const getCountry = await Country.findAll({
      where: {
        id: idCountry.toUpperCase()
      }
    })
    res.status(200).json(getCountry)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
})

// eng: create a tourist activity
// esp: crea una actividad turistica
router.post('/countries/activities', async (req, res) => {
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
})

module.exports = router
