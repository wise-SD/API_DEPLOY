import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'
import { ICitie } from '../../models'

export const updateById = async (
  id: number,
  nome: Omit<ICitie, 'id'>
): Promise<ICitie[] | Error> => {
  try {
    const updateRegister = await Knex(ETableNames.citie)
      .update(nome)
      .where('id', '=', id)
      .returning('*')

    if (updateRegister) return updateRegister

    return new Error('Error ao atualizar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Error ao atualizar o registro')
  }
}
