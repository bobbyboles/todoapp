const router = require('express').Router()
const Todo = require('../db/todo')

router.get('/', async (req, res, next) =>{
    try{
        const todos = await Todo.findAll()
    res.send(todos)
    }
    catch(err){
        console.log(error)
    }
})

router.get('/:todoId', async (req, res, next)=>{
    try{
        const todo = await Todo.findByPk(req.params.todoId)
        res.send(todo)
    }
    catch(err){
        console.log(err)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        res.status(201).send(await Todo.create(req.body))
    }
    catch(err){
        console.log(err)
    }
} )

router.put('/:todoId', async (req, res, next)=>{
    try{
        const todo = await Todo.findByPk(req.params.todoId)
        res.send(await todo.update(req.body))
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/:todoId", async (req, res, next)=>{
    try{
        const todo = await Todo.findByPk(req.params.todoId)
        todo.destroy()
        res.send(todo)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router
