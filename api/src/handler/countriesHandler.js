const { Country, Activity } = require('../db')
const { Op } = require('sequelize')
const axios = require('axios')

const validateStr = require('../hooks/useValidateString')
const cleanedCountries = require('../hooks/useCleanedCountries')

const getCountries = async (req, res) => {
  // esp:trae todos los paises
  // eng:bring all the countries
  const { name } = req.query
  try {
    if (!name) {
      const infoCleaned = await Country.findAll({
        order: [['name', 'ASC']] // Ordena ascendentemente por el campo 'name'
      })
      if (infoCleaned.length === 0) {
        const countries = (await axios('https://restcountries.com/v3/all')).data
        const infoCleaned = cleanedCountries(countries)
        await Country.bulkCreate(infoCleaned)
      }
      return res.status(200).json(infoCleaned)
    } else {
      // const search = name.toLowerCase()
      // Verifica si 'name' es una cadena antes de manipularla
      const search = typeof name === 'string' ? name.toLowerCase() : ''

      const findCountries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`
          }
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
}

const getCountriesById = async (req, res) => {
  const { idCountry } = req.params

  try {
    if (idCountry.length !== 3) {
      return res.status(400).json({ Error: 'The country ID must be 3 letters' })
    }

    const flag = validateStr(idCountry)
    if (flag) {
      return res.status(400).json({ error: 'ID cannot contain numbers' })
    }

    const country = await Country.findOne({
      where: { id: idCountry.toUpperCase() },
      include: {
        model: Activity,
        through: {
          attributes: []
        }
      }
    })
    if (!country) {
      return res.status(404).json({ error: 'Country not found' })
    }

    // La respuesta ahora contendrá las actividades relacionadas con el país
    res.status(200).json(country)
  } catch (error) {
    res.status(400).json({ Error: error.message })
  }
}

module.exports = {
  getCountries,
  getCountriesById
}
