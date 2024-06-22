import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { validation } from '../../shared/middlewares'
import { customErrorsMap } from '../../shared/services/ZodErrorsMap'
import { z } from 'zod'
import { Knex } from '../../database'
import { ETableNames } from '../../database/ETableNames'
import { CitiesProvider } from '../../database/providers'

interface IQueryProps {
  page?: number
  limit?: number
  filter?: string
}

const getAllSchema: z.ZodType<IQueryProps> = z.object({
  page: z.number().positive().optional(),
  limit: z.number().positive().optional(),
  filter: z.string().optional().optional(),
})

export const getAllValidation = validation({
  query: getAllSchema,
})

export const getAll = async (
  request: FastifyRequest<{ Querystring: IQueryProps }>,
  reply: FastifyReply
) => {
  const users = await CitiesProvider.getAll()

  if (users instanceof Error) {
    return reply.status(500).send({
      errors: { default: users.message },
    })
  }

  return reply.status(200).send({ users })

  // reply.headers({
  //   'access-control-expose-headers': 'x-total-count',
  //   'x-total-count': 1,
  // })

  // return reply.status(200).send([
  //   {
  //     id: 1,
  //     name: 'Recife',
  //   },
  // ])
}

z.setErrorMap(customErrorsMap)
