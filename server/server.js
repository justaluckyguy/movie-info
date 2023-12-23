const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {sequelize} = require('./models')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/api', (req, res) => {
    res.send({
        msg: 'Hello, node!'
    })
})

app.post('/user', (req, res) => {
    console.log(req)
})

sequelize.sync({force: true})
    .then(() => {
        console.log('Connection has been established successfully.')
        app.listen(3000, () => console.log('server has been started on port 3000'))
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err)
    })
