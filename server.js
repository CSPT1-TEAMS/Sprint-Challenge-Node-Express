const express = require('express');
const logger = require('morgan');

const routes = require('./data/helpers/actionModel')
const projectRoutes = require('./data/helpers/projectModel')

const server = express();
const port = 1963;
const success = 200;
const serverError = 500;

server.use(logger())
server.use(express.json())

server.get('/actions', (req, res) => {
    routes.get()
        .then((actions) => {
            res.status(success).json({ actions })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})
server.get('/actions/:id', (req, res) => {
    const {id} = req.params
    routes.get(id)
        .then((action) => {
            res.status(success).json({ action })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})

server.post('/actions', (req, res) => {
    const {
        project_id,
        description,
        notes,
    } = req.body

    const action = { project_id, description, notes, completed:false }

    routes.insert(action)
        .then((action) => {
            res.status(success).json(action)
        })
        .catch((error) => {
            res.status(serverError).json({ error: "check your object" })
        })
    })

server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const {
        project_id,
        description,
        notes,
        completed
    } = req.body

    const action = { project_id, description, notes, completed }

    routes.update(id,action)
    .then((action) => {
        res.status(success).json(action)
    })
    .catch((error) => {
        res.status(serverError).json({ error: "check your object" })
    })
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;

    routes.remove(id)
    .then((action) => {
        res.status(success).json(action)
    })
    .catch((error) => {
        res.status(serverError).json({ error: "no action at that endpoint" })
    })
})

server.get('/projects', (req, res) => {
    projectRoutes.get()
        .then((projects) => {
            res.status(success).json({ projects })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})

server.get('/projects/:id', (req, res) => {
    const {id} = req.params
    projectRoutes.get(id)
        .then((projects) => {
            res.status(success).json({ projects })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
})