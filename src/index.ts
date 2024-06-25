import 'dotenv/config'
import { env } from './env'
import { app } from './server/Server'
import { Knex } from './server/database'

const startServer = () => {
  app.listen(
    {
      port: env.PORT,
    },
    (err, address) => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
    }
  )
}

if (env.IS_LOCAL_HOST !== true) {
  Knex.migrate
    .latest()
    .then(() => {
      startServer()
    })
    .catch(console.log)
} else {
  startServer()
}
