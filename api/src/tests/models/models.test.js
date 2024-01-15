const { Country, Activity, conn } = require('../../db')
const { describe, expect, beforeAll, beforeEach, it } = require('@jest/globals')

describe('Models TEST', () => {
  beforeAll(async () => {
    conn.authenticate()
  })
  describe('Comprueba conexion con la DB', () => {
    it('probar conexion a la base de datos', () => {
      expect(conn.authenticate()).resolves.not.toThrow()
    })
  })
  describe('Testea modelo COUNTRY', () => {
    beforeEach(() => Country.sync())
    it('verificar que "Country" tenga las props minimas', () => {
      const attributes = Country.rawAttributes
      expect(attributes).toHaveProperty('name')
      expect(attributes).toHaveProperty('id')
      expect(attributes).toHaveProperty('flags')
      expect(attributes).toHaveProperty('continents')
      expect(attributes).toHaveProperty('capital')
    })
  })
  describe('Testea modelo ACTIVITIES', () => {
    beforeEach(() => Activity.sync())
    it('verificar que "Activities" tenga las props minimas', () => {
      const attributes = Activity.rawAttributes
      expect(attributes).toHaveProperty('id')
      expect(attributes).toHaveProperty('name')
      expect(attributes).toHaveProperty('season')
    })
  })
})
