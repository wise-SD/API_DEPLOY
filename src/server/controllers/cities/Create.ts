import { FastifyReply, FastifyRequest } from 'fastify'
import { validation } from '../../shared/middlewares'
import { z } from 'zod'
import { customErrorsMap } from '../../shared/services/ZodErrorsMap'

interface ICities {
  nome: string
}

const bodySchema: z.ZodType<ICities> = z.object({
  nome: z.string().min(3),
})

export const createValidation = validation({
  body: bodySchema,
})

export const create = async (
  request: FastifyRequest<{ Body: ICities }>,
  reply: FastifyReply
) => {
  console.log(request.body)

  return reply.status(201).send(1)
}

z.setErrorMap(customErrorsMap)
