import { ICitie } from '../../models'

declare module 'knex/types/tables' {
  interface Tables {
    cidade: ICitie
    // pessoa: IPessoa
    // usuario: IUsuario
  }
}
