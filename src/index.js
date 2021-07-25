const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const { getSpendings, getOneSpending, storeSpending } = require('./transport/spending')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  console.info('DB connection was established')

  app.get('/api/v1/spendings', getSpendings)
  app.get('/api/v1/spendings/:id', getOneSpending)
  app.post('/api/v1/spendings', storeSpending)
})

app.listen(process.env.APP_PORT, () => {
  console.log(`Budget app service listening at http://localhost:${process.env.APP_PORT}`)
})
