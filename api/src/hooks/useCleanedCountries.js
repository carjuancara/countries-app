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

module.exports = cleanedCountries
