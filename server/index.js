const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)

app.get('/',(req, res) => {
  res.send({
    title: "name"
  })
})

app.listen(4000, () => {
  console.log('http://localhost/4000')
})