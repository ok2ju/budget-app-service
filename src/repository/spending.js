const { Spending } = require('../domain/spending')

const getAll = async (query) => {
  try {
    const spendings = await Spending.find(query)
    return spendings
  } catch (error) {
    console.error('repository:getSpendings:error', error)
    return error
  }
}

const getById = async (spendingId) => {
  try {
    const spending = await Spending.findOne({ _id: spendingId })
    return spending
  } catch (error) {
    console.error('repository:getById:error', error)
    return error
  }
}

const store = async (data) => {
  try {
    const { _id } = await Spending.create(data)
    return _id
  } catch (error) {
    console.error('repository:store:error', error)
    return error
  }
}

module.exports = { getAll, getById, store }
