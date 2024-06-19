import { z } from 'zod'
import { validation } from '../../shared/middlewares'
import { FastifyReply, FastifyRequest } from 'fastify'

interface IParamProps {
  id?: number
}

const paramsSchema: z.ZodType<IParamProps> = z.object({
  id: z.number().int().positive(),
})

export const getByIdValidation = validation({
  params: paramsSchema,
})

export const getById = async (
  request: FastifyRequest<{ Params: IParamProps }>,
  reply: FastifyReply
) => {
  if (request.params.id === 99999)
    return reply
      .status(500)
      .send({ errors: { default: 'Registro não encontrado' } })

  return reply.status(200).send({
    id: request.params.id,
    nome: 'Recife',
  })
}
