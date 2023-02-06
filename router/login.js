const router=require('express').Router()
const Users = require('../functions/user')

router.post('/',(req,res)=>{
    let body=req.body
    console.log(body);
    Users.addUsers(body).then(data=>res.json(data))
})

router.put('/:obj',(req,res)=>{
    console.log("price");
    let obj = req.body
    Users.getPrice(obj).then(data=>res.json(data))
})

module.exports=router



