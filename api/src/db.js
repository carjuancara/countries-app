require('dotenv').config()
const { Sequelize } = require('sequelize')
const countryModel = require('./models/Country')
const activitiesModel = require('./models/Activity')

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
})

countryModel(sequelize)
activitiesModel(sequelize)

const { Country, Activity } = sequelize.models

// relaciones entre tablas
Country.belongsToMany(Activity, { through: 'CountryActivities', as: 'Activities' })
Activity.belongsToMany(Country, { through: 'CountryActivities', as: 'Countries' })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize // para importart la conexión { conn } = require('./db.js');
}
