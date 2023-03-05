const Sequelize = require('sequelize')
const db = require('../db')

const Todo = db.define('todo', {
    name:Sequelize.STRING
})

module.exports = Todo
