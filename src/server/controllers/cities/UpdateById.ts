import { z } from 'zod'
import { validation } from '../../shared/middlewares'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ICitie } from '../../database/models'
import { CitiesProvider } from '../../database/providers'
interface IParamProps {
  id?: number
}

interface IBodyProps extends Omit<ICitie, 'id'> {}

const paramsSchema: z.ZodType<IParamProps> = z.object({
  id: z.number().int().positive().optional(),
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
  if (!request.params.id) {
    return reply.status(400).send({
      errors: {
        default: 'O parâmetro nome não existe',
      },
    })
  }

  const result = await CitiesProvider.updateById(
    request.params.id,
    request.body
  )
  if (result instanceof Error) {
    return reply.status(500).send({
      errors: {
        default: result.message,
      },
    })
  }

  return reply.status(204).send(result)
}
