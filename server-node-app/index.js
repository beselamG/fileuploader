const express = require('express')
const cors = require('cors')
const blobRouter = require('./src/routes/blobRoute.js')
const conatinerRouter = require('./src/routes/containerRoute.js')
const app = express()
const PORT = process.env.PORT || 3001

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
// app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.use('/blob', blobRouter)
app.use('/container', conatinerRouter)
app.get('/ping', (req, res) => {
  res.send('pong')
})
app.get('/', (req, res) => {
  res.send('hello')
})
app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
