import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodType, z } from 'zod'
import { validation } from '../../shared/middlewares/Validation'

export interface IParamProps {
  id?: number
}

const ParamSchema: ZodType<IParamProps> = z.object({
  id: z.number().int().positive().optional(),
})

export const deleteByIdValidation = validation({
  params: ParamSchema,
})

export const deleteById = async (
  request: FastifyRequest<{ Params: IParamProps }>,
  reply: FastifyReply
) => {
  console.log(request.params)

  if (request.params.id === 99999)
    return reply
      .status(500)
      .send({ errors: { default: 'Registro não encontrado' } })

  return reply.status(204).send()
}
