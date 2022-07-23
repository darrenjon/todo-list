// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// get mongoose connection status
const db = mongoose.connection
// connection fails
db.on('error', () => {
  console.log('mongodb error!')
})
// connection successful
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})