const express = require('express')
const projectRoutes = express();

const projects = require('../data/helpers/projectModel')

const success = 200;
const serverError = 500;

projectRoutes.get('/', (req, res) => {
    projects.get()
        .then((projects) => {
            res.status(success).json({ projects })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})
projectRoutes.get('/:id', (req, res) => {
    const {id} = req.params
    projects.get(id)
        .then((project) => {
            res.status(success).json({ project })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})

projectRoutes.get('/actions/:id', (req, res) => {
    const {id} = req.params
    projects.getProjectActions(id)
        .then((actions) => {
            res.status(success).json({ actions })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})
projectRoutes.post('/', (req, res) => {
    const {
        name,
        description,
    } = req.body

    const project = { name, description, completed:false }

    projects.insert(project)
        .then((project) => {
            res.status(success).json(project)
        })
        .catch((error) => {
            res.status(serverError).json({ error: "check your object" })
        })
    })


    projectRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        completed
    } = req.body

    const project = { name, description, completed }

    projects.update(id,project)
    .then((project) => {
        res.status(success).json(project)
    })
    .catch((error) => {
        res.status(serverError).json({ error: "check your object" })
    })
})

projectRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    projects.remove(id)
    .then((project) => {
        res.status(success).json(project)
    })
    .catch((error) => {
        res.status(serverError).json({ error: "no project at that endpoint" })
    })
})

module.exports = projectRoutes;