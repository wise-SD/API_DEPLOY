import { testServer } from '../jest.setup'
import { app } from '../../src/server/Server'

describe('Cidades - DeleteById', () => {
  it('Apaga um registro', async () => {
    await app.ready()

    const response = await testServer.post('/cidades').send({ nome: 'Recife' })

    expect(response.statusCode).toEqual(201)

    const responseDelete = await testServer
      .delete(`/cidades/${response.body}`)
      .send()
    expect(responseDelete.statusCode).toEqual(204)
  })

  it('Tenta apagar um registro que não existe', async () => {
    const response = await testServer.delete('/cidades/99999').send()

    expect(response.statusCode).toEqual(500)
    expect(response.body).toHaveProperty('errors.default')
  })
})
