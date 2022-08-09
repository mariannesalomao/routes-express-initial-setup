const express = require('express')
const router = express.Router()
const { randomUUID } = require('crypto')
const fs = require('fs')


/**
 * GET => "PEGAR". Estou solicitando algo, ou seja, solicitando uma informação, um dado, etc.
 * POST => "CRIAR". Estou criando algo, ou seja, criando um registro, um dado, entre outros.
 * PUT => "ALTERAR". Estou alterando algo, ou seja, alterando algum registro, um dado, entre outros.
 * DELETE => "DELETAR". Estou deletando algo, ou seja, deletando algum registro, um dado, entre outros.
 */

// FUNCTIONS -----------------------------------------------------------------------------------

const produtoArquivo = () => {
  fs.writeFile('produtos.json', JSON.stringify(produtos), (erro) => {
    if (erro) {
      console.log(erro)
    } else {
      console.log('Produto inserido no arquivo produto.json')
    }
  })
}

// ---------------------------------------------------------------------------------------------

let produtos = []

// Simulando um banco de dados com o módulo filesystem do Node --------------------------------------

fs.readFile('produtos.json', 'utf-8', (erro, data) => {
  if (erro) {
    console.log(erro)
  } else {
    produtos = JSON.parse(data) // Trazer de volta para o formato de objeto
  }
})

// --------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  // res.status(200).json({ mensagem: "Bem vindo à rota de produto"})

  // ISSO abaixo é para depois da rota POST definida
  return res.json(produtos)
})

router.post('/', async (req, res) => {

  const { nome, preco } = req.body

  const produto = {
    nome,
    preco,
    id: randomUUID()
  }

  produtos.push(produto)

  // Vamos simular um banco de dados com o módulo FyleSystem do Node ---------------------------
  // fs.writeFile('produtos.json', JSON.stringify(produtos), (erro) => {
  //   if (erro) {
  //     console.log(erro)
  //   } else {
  //     console.log('Produto inserido no arquivo produto.json')
  //   }
  // })

  produtoArquivo()

  // -------------------------------------------------------------------------------------------

  return res.json(produto)
})

// OUTRAS ROTAS COM DELETE E PUT

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const produtoIndex = produtos.findIndex((produto) => produto.id === id)

  produtos.splice(produtoIndex, 1)

  produtoArquivo()

  return res.json({ mensagem: "Produto removido com sucesso" })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { nome, preco } = req.body

  const produtoIndex = produtos.findIndex((produto) => produto.id === id)
  produtos[produtoIndex] = {
    ...produtos[produtoIndex],
    nome,
    preco
  }

  produtoArquivo()

  return res.json({ mensagem: "Produto alterado com sucesso" })
})

module.exports = router