const { getAll, getById, store } = require('../repository/spending')

const getSpendings = async (_, res) => {
  const spendings = await getAll({})
  res.status(200).send({ spendings })
}

const getOneSpending = async (req, res) => {
  const { id } = req.params

  const spending = await getById(id)
  res.status(200).send(spending)
}

const storeSpending = async (req, res) => {
  const data = req.body // TODO: Add validation

  const spendingId = await store(data)
  res.status(200).send({ id: spendingId })
}

module.exports = { getSpendings, getOneSpending, storeSpending }
