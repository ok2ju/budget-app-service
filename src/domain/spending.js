const mongoose = require('mongoose')

const spendingSchema = new mongoose.Schema({
  category: String,
  note: String,
  amount: Number,
  currency: String,
  labels: [String],
  createdAt: { type: Date, default: Date.now }
})

const Spending = mongoose.model('Spending', spendingSchema)

module.exports = { Spending }
