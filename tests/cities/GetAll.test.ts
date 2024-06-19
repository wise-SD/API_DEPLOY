import { testServer } from '../jest.setup'
import { app } from '../../src/server/Server'

describe('Cidades - GetAll', () => {
  it('Buscar todos os registros', async () => {
    await app.ready()

    const response = await testServer.post('/cidades').send({ nome: 'Recife' })

    expect(response.statusCode).toEqual(201)

    const resGetAll = await testServer.get('/cidades').send()

    expect(Number(resGetAll.headers['x-total-count'])).toBeGreaterThan(0)
    expect(resGetAll.statusCode).toEqual(200)
    expect(resGetAll.body.length).toBeGreaterThan(0)
  })
})
