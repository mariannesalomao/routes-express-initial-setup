const express = require('express')
const cors = require('cors')
const produto = require('./src/routes/produto')

const server = express()
const PORT = process.env.PORT || 8080

server.use(express.json())
server.use(cors())

server.use('/produto', produto)

server.get('/', (req, res) => {
  res.sendStatus(200)
})

require('./src')(server)

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})