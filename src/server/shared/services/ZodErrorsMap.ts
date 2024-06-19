import { z } from 'zod'

export const customErrorsMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: `O valor deve conter mais de ${issue.minimum} caracter ` }
  }

  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined') {
      return { message: 'Campo obrigatório' }
    }
    if (issue.expected === 'string') {
      const path = issue.path[0]
      return { message: `${path} invalido` }
    }
  }

  return { message: ctx.defaultError }
}
