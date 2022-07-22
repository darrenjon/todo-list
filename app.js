// require packages used in the project
const express = require('express')
const app = express()

// routes setting
app.get('/', (req, res) => {
  res.send('This is the todo-list built with Express')
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})