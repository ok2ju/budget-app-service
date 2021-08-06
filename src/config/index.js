if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { DB_HOST, DB_PORT, DB_DATABASE, APP_PORT, LOG_LEVEL } = process.env

module.exports = {
  app: {
    port: APP_PORT
  },
  db: {
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE
  },
  logger: {
    level: LOG_LEVEL
  }
}
