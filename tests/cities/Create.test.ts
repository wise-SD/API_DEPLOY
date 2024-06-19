import { app } from '../../src/server/Server'
import { testServer } from '../jest.setup'

describe('Cidades - Create', () => {
  it('Cria registro', async () => {
    await app.ready()

    const response = await testServer.post('/cidades').send({ nome: 'Recife' })

    expect(response.statusCode).toEqual(201)
    expect(typeof response.body).toEqual('number')
  })
  it('Tenta criar um registro com nome muito curso', async () => {
    const response = await testServer.post('/cidades').send({ nome: 'Re' })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('errors.body.nome')
  })

  it('Tenta criar um registro vazio', async () => {
    const response = await testServer.post('/cidades').send({ nome: '' })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('errors.body.nome')
  })

  it('Tenta criar um registro do tipo number', async () => {
    const response = await testServer.post('/cidades').send({ nome: 1 })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toHaveProperty('errors.body.nome')
  })
})
