const port = 3000
const app = require('./app')
const { db } = require('./db')
const { Todo, User } = require('./db')

const syncAndSeed = async () => {
    await db.sync({force:true})

    await Todo.create({
        name:"Get back on the grind asshole and stop playing with that really expensive keyboard" 
    })

    await User.create({
        username: "marshuni", 
        password: "youknowit", 
        email: 'rdb3216@gmail.com'
    })
    console.log('Seed and Sync Successful')
}

syncAndSeed().then(()=>{
    app.listen(port, ()=> console.log(`listening on port ${port}`))
})

