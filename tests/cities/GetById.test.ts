import { testServer } from '../jest.setup'
import { app } from '../../src/server/Server'

describe('Cidades - GetById', () => {
  app.ready()

  it('Busca registro por id', async () => {
    const resGetById = await testServer
      .post('/cidades')
      .send({ nome: 'Recife' })

    expect(resGetById.statusCode).toEqual(201)

    const resSearch = await testServer.get(`/cidades/${resGetById.body}`).send()

    expect(resSearch.statusCode).toEqual(200)
    expect(resSearch.body).toHaveProperty('nome')
  })

  it('Tenta buscar registro que não existe', async () => {
    const resGetById = await testServer.get('/cidades/99999').send()

    expect(resGetById.statusCode).toEqual(500)
    expect(resGetById.body).toHaveProperty('errors.default')
  })
})
