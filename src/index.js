module.exports = (server) => {
  server.use('/produto', require('./routes/produto'))
  server.use('/cliente', require('./routes/cliente'))
}