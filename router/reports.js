const router = require('express').Router()
const Newspaper = require('../functions/newspaper')

router.get('/:date', (req, res) => {
    let date = req.params.date
    console.log("date", date);
    Newspaper.newspaperOrder(date).then(data => res.json(data))
})


router.put('/', (req, res) => {
    let obj=req.body
    console.log(obj,"obj");
    Newspaper.updateReport(obj.numPlace,obj).then(data => res.json(data))
})

module.exports = router
