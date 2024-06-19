import { z } from 'zod'
import { validation } from '../../shared/middlewares'
import { FastifyReply, FastifyRequest } from 'fastify'

interface IParamProps {
  id: number
}

interface IBodyProps {
  nome: string
}

const paramsSchema: z.ZodType<IParamProps> = z.object({
  id: z.number().int().positive(),
})
const BodySchema: z.ZodType<IBodyProps> = z.object({
  nome: z.string().min(3),
})

export const updateByIdValidation = validation({
  params: paramsSchema,
  body: BodySchema,
})

export const updateById = async (
  request: FastifyRequest<{ Params: IParamProps; Body: IBodyProps }>,
  reply: FastifyReply
) => {
  if (request.params.id === 99999)
    return reply
      .status(500)
      .send({ errors: { default: 'Registro não encontrado' } })

  return reply.status(200).send()
}
