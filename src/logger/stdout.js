const fs = require('fs')
const tee = require('pino-tee')

const stream = tee(process.stdin)

stream.tee(
  fs.createWriteStream('./logs/http.log', { flags: 'a' }),
  line => line.level === 10
)

stream.tee(
  fs.createWriteStream('./logs/combined.log', { flags: 'a' }),
  'info'
)

stream.tee(
  fs.createWriteStream('./logs/error.log', { flags: 'a' }),
  'error'
)

stream.pipe(process.stdout)
