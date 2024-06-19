import supertest from 'supertest'

import { app } from '../src/server/Server'

export const testServer = supertest(app.server)
