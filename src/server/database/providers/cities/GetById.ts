import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICitie } from '../../models'

export const getById = async (id: number): Promise<ICitie | Error> => {
  try {
    const result = await Knex(ETableNames.citie)
      .select('*')
      .where('id', '=', id)
      .first()

    if (result) return result

    return new Error('Registro não encontrado')
  } catch (error) {
    console.log(error)
    return new Error('Registro não encontrado')
  }
}
