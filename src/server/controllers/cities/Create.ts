import { FastifyReply, FastifyRequest } from 'fastify'
import { customErrorsMap } from '../../shared/services/ZodErrorsMap'
import { validation } from '../../shared/middlewares'
import { ICitie } from '../../database/models'
import { CitiesProvider } from '../../database/providers'
import { z } from 'zod'

interface IBodyProps extends Omit<ICitie, 'id'> {}

const bodySchema: z.ZodType<IBodyProps> = z.object({
  nome: z.string().min(3).max(100),
})

export const createValidation = validation({
  body: bodySchema,
})

export const create = async (
  request: FastifyRequest<{ Body: IBodyProps }>,
  reply: FastifyReply
) => {
  const result = await CitiesProvider.create(request.body)

  if (result instanceof Error) {
    return reply.status(500).send({
      errors: { default: result.message },
    })
  }

  return reply.status(201).send(result)
}

z.setErrorMap(customErrorsMap)
