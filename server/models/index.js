const path = require('path')
const fs = require('fs')
const config = require('../config')
const Sequelize = require('sequelize')
const db = {}


const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.options
)

// const User = sequelize.import(__dirname + "./User.js");

// const UserModel = require('./User')
// const User = sequelize.define('user', UserModel)

// 导入所有的model
fs.readdirSync(__dirname)
.filter(file => file !== 'index.js')
.forEach(file => {
    const model = require(path.join(__dirname, file))
    db[model.name] = sequelize.define(model.name, model)
})


db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db