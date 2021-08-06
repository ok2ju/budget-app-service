const Joi = require('joi')
const { getAll, getById, store } = require('../repository/spending')

const getSpendingsSchema = Joi.object({
  category: Joi.string().pattern(/^(food|bills|shopping|gifts|healthcare|taxi)$/),
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
  labels: Joi.string(),
  page: Joi.number().min(1),
  perPage: Joi.number().min(10)
})

const getSpendings = async (req, res) => {
  try {
    req.log.info('transport:getSpendings')

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
    req.log.error('transport:getSpendings', error)
    res.status(500).send({ error: 'Internal server error' })
  }
}

const getOneSpendingSchema = {
  id: Joi.string().required()
}

const getOneSpending = async (req, res) => {
  try {
    req.log.info('transport:getOneSpending')

    const { id } = req.params
    const spending = await getById(id)
    res.status(200).send(spending)
  } catch (error) {
    req.log.error('transport:getOneSpending', error)
    res.status(500).send({ error: 'Internal server error' })
  }
}

const storeSpendingSchema = Joi.object({
  category: Joi.string().pattern(/^(food|bills|shopping|gifts|healthcare|taxi)$/).required(),
  note: Joi.string(),
  amount: Joi.number().min(0).required(),
  currency: Joi.string().pattern(/^(BYN|RUB|USD|EUR)$/).required(),
  labels: Joi.array().items(Joi.string()),
  createdAt: Joi.date().iso()
})

const storeSpending = async (req, res) => {
  try {
    req.log.info('transport:storeSpending')

    const bodyData = req.body
    const spendingData = { ...bodyData, labels: bodyData.labels?.split(',') }

    const spendingId = await store(spendingData)
    res.status(200).send({ id: spendingId })
  } catch (error) {
    req.log.error('transport:storeSpending', error)
    res.status(500).send({ error: 'Internal server error' })
  }
}

module.exports = {
  getSpendingsSchema,
  getSpendings,
  getOneSpendingSchema,
  getOneSpending,
  storeSpendingSchema,
  storeSpending
}
