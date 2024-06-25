import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICitie } from '../../models'

export const updateById = async (
  id: number,
  cidade: Omit<ICitie, 'id'>
): Promise<void | Error> => {
  try {
    const updateRegister = await Knex(ETableNames.citie)
      .update(cidade)
      .where('id', '=', id)

    if (updateRegister > 0) return

    return new Error('Error ao atualizar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Error ao atualizar o registro')
  }
}
