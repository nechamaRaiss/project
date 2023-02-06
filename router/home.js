const router = require('express').Router()
const Users = require('../functions/user')

router.get('/', (req, res) => {
    Users.getAllUsers().then(data => res.json(data))
})

router.get('/:password', (req, res) => {
    let password = req.params.password
    Users.getUserByPassword(password).then(user => res.json(user))
})

router.put('/:password',(req,res)=>{
    console.log("password",req.params.password);
    let password=req.params.password
    let obj=req.body
    if (obj.buy.size == 'Back') {
        console.log("back");
        Users.backPage(password, obj).then(data => res.json(data))
    }
    if (obj.buy.size == 'FirstPage'|| obj.buy.size == 'DoubleFirst') {
        console.log("first");
        Users.firstPage(password, obj).then(data => res.json(data))
    }
    else {
        Users.updateUsers(password, obj).then(data => res.json(data))
    }
})
 
router.delete('/:password',(req,res)=>{
    console.log("delete");
    let password = req.params.password
    Users.deleteBuy(password).then(data=>res.json(data))
})



module.exports = router



