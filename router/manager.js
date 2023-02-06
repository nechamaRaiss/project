const router = require('express').Router()
const Users = require('../functions/user')

router.get('/', (req, res) => {
    Users.getAllReports().then(data => res.json(data))
})

router.get('/:date', (req, res) => {
    let date = req.params.date
    console.log("date", date);
    Users.getOrderByDate(date).then(user => res.json(user))
})
module.exports = router