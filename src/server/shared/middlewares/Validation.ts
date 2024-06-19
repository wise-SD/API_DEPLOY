import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { z } from 'zod'

type TProperty = 'body' | 'headers' | 'params' | 'query'

type TAllSchemas = Record<TProperty, z.ZodType<any>>

type TValidation = (
  schemas: Partial<TAllSchemas>
) => (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => void | Promise<void>

export const validation: TValidation =
  (schemas) => async (request, reply, done) => {
    const errorsResult: Record<string, Record<string, string>> = {}

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.parse(request[key as TProperty])
        console.log('passou!!!!')
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

    if (Object.entries(errorsResult).length === 0) {
      return done()
    } else {
      console.log(errorsResult)

      return reply.status(400).send({ errors: errorsResult })
    }
  }
