const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
      get () {
        const firstCapital = this.getDataValue('name')
        return firstCapital ? firstCapital[0].toUpperCase() + firstCapital.slice(1) : null
      },
      set (value) {
        this.setDataValue('name', value.toLowerCase())
      }
    },
    flags: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    continents: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING(),
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER(),
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER(),
      allowNull: true
    }
  }, {
    timestamps: false
  })
}
