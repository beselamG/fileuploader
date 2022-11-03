const express = require('express')
const cors = require('cors')
const blobRouter = require('./src/routes/blobRoute.js')
const conatinerRouter = require('./src/routes/containerRoute.js')
const { requestLogger } = require('./src/middleware/requestLogger.js')
const { unknownEndpoint } = require('./src/middleware/unknownEndpoint.js')
const app = express()
const PORT = process.env.PORT || 3001

// app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.use('/blob', blobRouter)
app.use('/container', conatinerRouter)
app.get('/', (req, res) => {
  res.send('hello')
})
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
