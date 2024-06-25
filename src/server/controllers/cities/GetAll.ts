import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { validation } from '../../shared/middlewares'
import { customErrorsMap } from '../../shared/services/ZodErrorsMap'
import { z } from 'zod'
import { CitiesProvider } from '../../database/providers'

interface IQueryProps {
  id?: number
  page?: number
  limit?: number
  filter?: string
}

const getAllSchema: z.ZodType<IQueryProps> = z.object({
  page: z.number().positive().optional(),
  limit: z.number().positive().optional(),
  filter: z.string().optional().optional(),
  id: z.number().int().default(0).optional(),
})

export const getAllValidation = validation({
  query: getAllSchema,
})

export const getAll = async (
  request: FastifyRequest<{ Querystring: IQueryProps }>,
  reply: FastifyReply
) => {
  const result = await CitiesProvider.getAll(
    request.query.page || 1,
    request.query.limit || 7,
    request.query.filter || '',
    request.query.id
  )
  const count = await CitiesProvider.count(request.query.filter)

  if (result instanceof Error) {
    return reply.status(500).send({
      errors: { default: result.message },
    })
  } else if (count instanceof Error) {
    return reply.status(500).send({
      errors: { default: count.message },
    })
  }

  reply.headers({
    'access-control-expose-headers': 'x-total-count',
    'x-total-count': count,
  })

  return reply.status(200).send(result)
}

z.setErrorMap(customErrorsMap)
