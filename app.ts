import express from 'express'
import routes from './routes'
import logger from './utils/logger'

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/', routes)

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`)
})
