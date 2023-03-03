const port = 3000
const app = require('./app')
const db = require('./db/db')
const Todo = require('./db/todo')

const syncAndSeed = async () => {
    await db.sync({force:true})

    await Todo.create({
        name:"Get back on the grind asshole and stop playing with that really expensive keyboard" 
    })
    console.log('Seed and Sync Successful')
}

syncAndSeed().then(()=>{
    app.listen(port, ()=> console.log(`listening on port ${port}`))
})

