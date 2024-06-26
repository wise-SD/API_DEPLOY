import { ICitie, IPerson } from '../../models'

declare module 'knex/types/tables' {
  interface Tables {
    cidade: ICitie
    pessoa: IPerson
    // usuario: IUsuario
  }
}
