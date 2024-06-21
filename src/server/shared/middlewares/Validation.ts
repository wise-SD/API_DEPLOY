import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { z } from 'zod'

type TProperty = 'body' | 'headers' | 'params' | 'query'

type TAllSchemas = Record<TProperty, z.ZodType<any>>

type TValidation = (
  schemas: Partial<TAllSchemas>
) => (request: FastifyRequest, reply: FastifyReply) => void | Promise<void>

export const validation: TValidation = (schemas) => async (request, reply) => {
  const errorsResult: Record<string, Record<string, string>> = {}

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.parse(request[key as TProperty])
    } catch (err) {
      const zodError = err as z.ZodError
      const errors: Record<string, string> = {}

      zodError.issues.forEach((issue) => {
        if (!issue.path) return

        const path = issue.path.join('.')

        errors[path] = issue.message
      })

      errorsResult[key] = errors
    }
  })

  if (Object.entries(errorsResult).length === 0) return

  return reply.status(400).send({ errors: errorsResult })
}
