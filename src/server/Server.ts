import { registerCities } from './routes'
import fastify from 'fastify'

const app = fastify({
  logger: true,
})

app.register(registerCities, {
  prefix: 'cidades',
})

export { app }
