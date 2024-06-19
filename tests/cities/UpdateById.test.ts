import { testServer } from '../jest.setup'
import { app } from '../../src/server/Server'

describe('Cidades - UpdateBydId', () => {
  app.ready()

  it('Atualizar registro', async () => {
    const resCreateuser = await testServer
      .post('/cidades')
      .send({ nome: 'Recife' })

    expect(resCreateuser.statusCode).toEqual(201)
    const resUpdate = await testServer
      .put(`/cidades/${resCreateuser.body}`)
      .send({ nome: 'Maceio' })

    expect(resUpdate.statusCode).toEqual(200)
  })

  it('Tenta atualizar um registro que não existe', async () => {
    const resUpdate = await testServer
      .put('/cidades/99999')
      .send({ nome: 'Maceio' })

    expect(resUpdate.statusCode).toEqual(500)
    expect(resUpdate.body).toHaveProperty('errors.default')
  })
})
