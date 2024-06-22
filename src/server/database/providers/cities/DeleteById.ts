import { ETableNames } from '../../ETableNames'
import { Knex } from '../../knex'

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const deleteRegister = await Knex(ETableNames.citie)
      .where('id', '=', id)
      .del()

    if (deleteRegister > 0) return

    return new Error('Error ao deletar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Registro nao encontrado')
  }
}
