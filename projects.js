const projects = require('./data/helpers/projectModel')
const projectRouter = require('express').Router()


projectRouter.get('/', (req,res) => {
    projects.get()
    .then(response => res.send(response))
    .error(err => res.send(err))
})

projectRouter.get('/:id', (req,res) => {
    projects.get(req.params.id)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

projectRouter.post('/',(req,res) => {
    projects.insert(req.body)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

projectRouter.put('/:id', (req,res) => {
    projects.update(req.params.id,req.body)
    .then(response => res.send(response))
    .error(err => res.sendStatus(500))
})

projectRouter.delete('/:id', (req,res) => {
    projects.remove(req.params.id)
    .then(response => res.sendStatus(200))
    .error(err => res.sendStatus(500))
})

projectRouter.get('/actions/:id', (req,res) => {
    projects.getProjectActions(req.params.id)
    .then(response => res.send(response))
    .error(err => res.send(err))
})

module.exports = projectRouter;