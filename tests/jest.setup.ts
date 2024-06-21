import supertest from 'supertest'

import { app } from '../src/server/Server'
import { Knex } from '../src/server/database/knex'

beforeAll(async () => {
  await Knex.migrate.latest()
})

afterAll(async () => {
  await Knex.destroy()
})

export const testServer = supertest(app.server)
