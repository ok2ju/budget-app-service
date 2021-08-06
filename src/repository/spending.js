const { Spending } = require('../domain/spending')
const logger = require('../logger')

const getAll = async ({ category, from, to, labels, page, perPage }) => {
  try {
    const query = {
      ...(category ? { category: category } : {}),
      ...(from && to ? { createdAt: { $gte: from, $lte: to } } : {}),
      ...(labels ? { labels: { $in: labels } } : {})
    }

    const spendings = await Spending
      .find(query)
      .skip((page * perPage) - perPage)
      .limit(+perPage)

    const count = await Spending.countDocuments(query)

    return { spendings, page: page || 1, totalPages: Math.ceil(count / (perPage || count)) }
  } catch (error) {
    logger.error('repository:getSpendings', error)
    return error
  }
}

const getById = async (spendingId) => {
  try {
    return await Spending.findOne({ _id: spendingId })
  } catch (error) {
    logger.error('repository:getById', error)
    return error
  }
}

const store = async (data) => {
  try {
    const { _id } = await Spending.create(data)
    return _id
  } catch (error) {
    logger.error('repository:store', error)
    return error
  }
}

module.exports = { getAll, getById, store }
