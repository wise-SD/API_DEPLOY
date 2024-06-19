import 'dotenv/config'
import { env } from './env'
import { app } from './server/Server'

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
