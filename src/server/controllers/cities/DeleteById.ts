import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodType, z } from 'zod'
import { validation } from '../../shared/middlewares/Validation'
import { CitiesProvider } from '../../database/providers'

export interface IParamProps {
  id: number
}

const ParamSchema: ZodType<IParamProps> = z.object({
  id: z.number().int().positive(),
})

export const deleteByIdValidation = validation({
  params: ParamSchema,
})

export const deleteById = async (
  request: FastifyRequest<{ Params: IParamProps }>,
  reply: FastifyReply
) => {
  const result = await CitiesProvider.deleteById(request.params.id)

  if (result instanceof Error) {
    return reply.status(500).send({
      errors: { default: result.message },
    })
  }

  return reply.status(200).send({ message: 'Deletado com sucesso' })
}
