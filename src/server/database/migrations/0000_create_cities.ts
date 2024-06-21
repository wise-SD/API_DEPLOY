import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.citie, (table) => {
      table.bigIncrements('id').primary().index()
      table.string('nome', 100).checkLength('<=', 100).index().notNullable()

      table.comment('Tabela usada para armazenar cidades do sistema.')
    })
    .then(() => {
      console.log(`# Create Table ${ETableNames.citie}`)
    })
}
export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.citie).then(() => {
    console.log(`# Drop Table ${ETableNames.citie}`)
  })
}
