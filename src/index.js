const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const expressPinoLogger = require('express-pino-logger')
const config = require('./config')
const logger = require('./logger')
const validatorMiddleware = require('./middlewares/validator')
const st = require('./transport/spending')

const app = express()
const epl = expressPinoLogger({ logger, useLevel: config.logger.level })

app.use(epl)
app.use(cors())
app.use(express.json())

const dbConnectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (error) => {
  logger.error('Database connection error', error)
})

db.once('open', () => {
  logger.info('Database connection was established')

  app.get('/ping', (_, res) => res.send('pong'))
  app.get('/api/v1/spendings', validatorMiddleware(st.getSpendingsSchema, 'query'), st.getSpendings)
  app.get('/api/v1/spendings/:id', validatorMiddleware(st.getOneSpendingSchema, 'params'), st.getOneSpending)
  app.post('/api/v1/spendings', validatorMiddleware(st.storeSpendingSchema, 'body'), st.storeSpending)
})

app.listen(config.app.port, () => {
  logger.info(`Budget app service listening at http://localhost:${config.app.port}`)
})
