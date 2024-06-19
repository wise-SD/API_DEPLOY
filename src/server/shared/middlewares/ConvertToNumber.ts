import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const convertStringToNumber = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (request.method === 'GET' || 'PUT' || 'DELETE') {
    const query = request.query as Record<string, number>
    const params = request.params as Record<string, number>

    if (query.page !== undefined) {
      query.page = Number(query.page)
    }

    if (query.limit !== undefined) {
      query.limit = Number(query.limit)
    }

    if (params.id !== undefined) {
      params.id = Number(params.id)
    }
  }

  done()
}
