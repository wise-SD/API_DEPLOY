import { knex } from 'knex'
import { env } from '../../../env'
import { development, production, test } from './Environment'

const getEnvironment = () => {
  switch (env.NODE_ENV) {
    case 'test':
      return test
    case 'production':
      return production
    default:
      return development
  }
}

export const Knex = knex(getEnvironment())
