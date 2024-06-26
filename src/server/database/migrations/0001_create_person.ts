import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export const up = async (knex: Knex) => {
  return knex.schema
    .createTable(ETableNames.person, (table) => {
      table.bigIncrements('id').primary().index()
      table.string('first_name', 50).index().notNullable()
      table.string('last_name', 50).index().notNullable()
      table.string('email').unique().notNullable()
      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.citie)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

      table.comment('Tabela para armazenar pessoas do sistema')
    })
    .then(() => {
      console.log(`# Create Table: ${ETableNames.person}`)
    })
}

export const down = async (knex: Knex) => {
  return knex.schema.dropTable(ETableNames.person).then(() => {
    console.log(`# Drop Person ${ETableNames.person}`)
  })
}
