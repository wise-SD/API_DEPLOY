import { FastifyInstance } from 'fastify'
import { CitiesController } from '../controllers'
import { convertStringToNumber } from '../shared/middlewares'

const registerCities = async (app: FastifyInstance) => {
  app.addHook('preValidation', convertStringToNumber)

  app.get('/', {
    preHandler: CitiesController.getAllValidation,
    handler: CitiesController.getAll,
  })

  app.post('/', {
    preHandler: CitiesController.createValidation,
    handler: CitiesController.create,
  })

  app.get('/:id', {
    preHandler: CitiesController.getByIdValidation,
    handler: CitiesController.getById,
  })

  app.put('/:id', {
    preHandler: CitiesController.updateByIdValidation,
    handler: CitiesController.updateById,
  })

  app.delete('/:id', {
    preHandler: CitiesController.deleteByIdValidation,
    handler: CitiesController.deleteById,
  })
}

export { registerCities }
