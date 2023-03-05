const router = require('express').Router()
const { User } = require('../db/')

router.get('/', async (req, res, next) =>{
    try{
        const users = await Todo.findAll()
    res.send(users)
    }
    catch(err){
        console.log(err)
    }
})

router.get('/:userId', async (req, res, next)=>{
    try{
        const user = await User.findByPk(req.params.userId)
        res.send(user)
    }
    catch(err){
        console.log(err)
    }
})

router.post('/', async (req, res, next)=>{
    try{
        res.status(201).send(await User.create(req.body))
    }
    catch(err){
        console.log(err)
    }
} )

router.put('/:userId', async (req, res, next)=>{
    try{
        const user = await User.findByPk(req.params.userId)
        res.send(await user.update(req.body))
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/:userId", async (req, res, next)=>{
    try{
        const user = await User.findByPk(req.params.todoId)
        user.destroy()
        res.send(user)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router
