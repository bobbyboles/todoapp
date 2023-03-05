

const db = require('./db')

const User = require('./models/user')
const Todo = require('./models/todo')

User.hasMany(Todo)
Todo.belongsTo(User)


module.exports = {
    db, 
    User,
    Todo
}
