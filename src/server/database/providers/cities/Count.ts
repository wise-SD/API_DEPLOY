import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'

export const count = async (filter = ''): Promise<number | Error> => {
  const IsValidNumber = Number.isInteger(Number(count))
  try {
    const [{ count }] = await Knex(ETableNames.citie)
      .where('nome', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count')

    if (IsValidNumber) return Number(count)

    return new Error('Erro ao consultar a quantidade total de registros')
  } catch (error) {
    console.log(error)

    return new Error('Erro ao consultar a quantidade total de registros')
  }
}
