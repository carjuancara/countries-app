/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest')
const app = require('../../src/app.js')
const { Op } = require('sequelize')
const { conn, Country } = require('../../src/db.js')
const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals')
const agent = request(app)

describe('Routes TEST', () => {
  beforeAll(() => conn.sync({ force: true }))
  describe('GET /countries', () => {
    it('debe devolver 200', () =>
      agent.get('/countries').expect(200)
    )
    it('debe devolver un array de paises, con las respectivas props', async () => {
      const response = await agent.get('/countries')
      expect(response.body.length).toBeGreaterThan(0)

      // Verifica que cada elemento en el array sea un objeto
      // con las props obligatorias
      response.body.forEach(file => {
        expect(typeof file).toBe('object')
        expect(file).toHaveProperty('name')
        expect(file).toHaveProperty('capital')
        expect(file).toHaveProperty('id')
        expect(file).toHaveProperty('flags')
        expect(file).toHaveProperty('continents')
      })
    })
    it('debe devolver las coincidencias parciales del nombre con un "string" ', async () => {
      const name = 'es'
      const response = await Country.findAll({
        where: {
          name: { [Op.substring]: name }
        }
      })
      expect(Array.isArray(response)).toBe(true)
    })
    it('debe devolver un pais buscado por ID', async () => {
      const ids = ['HKG', 'CCK', 'BEL', 'UMI', 'ATG']
      const arrayPromise = ids.map(id => Country.findByPk(id))
      const response = await Promise.all(arrayPromise)
      expect(response.length).toBe(5)
    })
  })
  describe('POST /activities', () => {
    it('Crea una nueva actividad turistica', async () => {
      const newActivity = {
        name: 'canotaje',
        difficulty: '3',
        duration: 15,
        season: 'Verano',
        countries: ['HKG', 'CCK', 'BEL', 'UMI', 'ATG']
      }
      const response = await agent.post('/countries/activities')
        .send(newActivity)
      expect(response.status).toBe(201)
    })
  })
  afterAll(async () => {
    await conn.close()
  })
})
