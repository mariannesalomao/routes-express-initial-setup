const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.status(200).json({ mensagem: "Bem vindo à rota de cliente"})
})

module.exports = router