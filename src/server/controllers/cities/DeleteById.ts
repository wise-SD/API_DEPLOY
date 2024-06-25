import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodType, z } from 'zod'
import { validation } from '../../shared/middlewares/Validation'
import { CitiesProvider } from '../../database/providers'

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
  const isIdExists = request.params.id

  if (!isIdExists) {
    return reply.status(400).send({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    })
  }

  const result = await CitiesProvider.deleteById(isIdExists)
  if (result instanceof Error) {
    return reply.status(500).send({
      errors: { default: result.message },
    })
  }

  return reply.status(204).send()
}
