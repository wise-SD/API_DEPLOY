import { registerCities } from './routes'
import fastify from 'fastify'

const app = fastify({
  logger: true,
})

app.get('/', (request, reply) => {
  reply.status(200).send('Worked')
})

app.register(registerCities, {
  prefix: 'cidades',
})

export { app }
