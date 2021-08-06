const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property])

    if (!error) {
      next()
    } else {
      const { details } = error
      const message = details.map((d) => d.message).join(',')
      req.log.error(`Validation error in ${property}`)
      res.status(400).send({ error: message })
    }
  }
}

module.exports = validator
