const express = require('express')
const Joi = require('joi')
const router = express.Router()
const genres = [
    {id:1, name:'genera1'},
    {id:2, name:'genera2'},
    {id:3, name:'genera3'},

]
const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
})

// get all courses
router.get('/', (req, res)=>{
    res.send(genres)

})

// get specific course
router.get('/:id', (req, res)=>{
    let genre = genres.find((g)=>g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given id not found')
    res.send(genre)
})

// add new course

router.post('/post', (req, res)=>{
    const {error} = validator(req.body.name)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    const genera = {id:genres.length+1, name:req.body.name}
    genres.push(genera)
    res.send(genera)
})
// edit specific course
router.put('/:id', (req, res)=>{
    const genre = genres.find((g)=>g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('There is no genre with the given id')
    const {error} = validator(req.body.name)
    if (error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)

})
// delete specific course
router.delete('/:id', (req, res)=>{
    const genre = genres.find((g)=>g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('There is no genre with the given id')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
})



//JOI VALIDATOR INSTANCE USAGE 
const validator = (name)=>{
    return schema.validate({name:name})
}

module.exports = router