const { getAll, getById, store } = require('../repository/spending')

const getSpendings = async (req, res) => {
  try {
    const result = await getAll({
      category: req.query.category,
      from: req.query.from,
      to: req.query.to,
      labels: req.query.labels?.split(','),
      page: req.query.page,
      perPage: req.query.perPage
    })

    res.status(200).send({
      spendings: result.spendings,
      pagination: {
        page: result.page,
        pages: result.totalPages
      }
    })
  } catch (error) {
    res.status(500).send({ error: '' }) // TODO: Handle errors here
  }
}

const getOneSpending = async (req, res) => {
  try {
    const { id } = req.params

    const spending = await getById(id)
    res.status(200).send(spending)
  } catch (error) {
    res.status(500).send({ error: '' }) // TODO: Handle errors here
  }
}

const storeSpending = async (req, res) => {
  try {
    const bodyData = req.body // TODO: Add validation
    const spendingData = { ...bodyData, labels: bodyData.labels?.split(',') }

    const spendingId = await store(spendingData)
    res.status(200).send({ id: spendingId })
  } catch (error) {
    res.status(500).send({ error: '' }) // TODO: Handle errors here
  }
}

module.exports = { getSpendings, getOneSpending, storeSpending }
