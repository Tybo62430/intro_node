const express = require('express')
const bodyParser = require('body-parser')
const orders = require('./routes/orders')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.SERVER_PORT

app.set('view engine', 'ejs')

mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.use('/orders', orders)

app.get('*', (req, res) => {
  res.status(404).send('<iframe src="https://giphy.com/embed/aYpmlCXgX9dc09dbpl" class="center" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p></p>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
