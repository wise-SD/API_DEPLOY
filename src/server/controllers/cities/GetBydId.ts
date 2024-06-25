import { z } from 'zod'
import { validation } from '../../shared/middlewares'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CitiesProvider } from '../../database/providers'

interface IParamProps {
  id?: number
}

const paramsSchema: z.ZodType<IParamProps> = z.object({
  id: z.number().int().positive().optional(),
})

export const getByIdValidation = validation({
  params: paramsSchema,
})

export const getById = async (
  request: FastifyRequest<{ Params: IParamProps }>,
  reply: FastifyReply
) => {
  const isIdExists = request.params.id

  if (!isIdExists) {
    return reply.status(400).send({
      errors: {
        default: 'O parâmetro "id" precisa ser informado',
      },
    })
  }

  const result = await CitiesProvider.getById(isIdExists)
  if (result instanceof Error) {
    return reply.status(500).send({
      errors: {
        default: result.message,
      },
    })
  }

  return reply.status(200).send(result)
}
