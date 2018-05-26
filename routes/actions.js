const express = require('express')
const actionRoutes = express();

const actions = require('../data/helpers/actionModel')

const success = 200;
const serverError = 500;

actionRoutes.get('/', (req, res) => {
    actions.get()
        .then((actions) => {
            res.status(success).json({ actions })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})
actionRoutes.get('/:id', (req, res) => {
    const {id} = req.params
    actions.get(id)
        .then((action) => {
            res.status(success).json({ action })
        })
        .catch((error) => {
            res.status(serverError).json({ error:"No data at that endpoint, check your server" })
        })
})

actionRoutes.post('/', (req, res) => {
    const {
        project_id,
        description,
        notes,
    } = req.body

    const action = { project_id, description, notes, completed:false }

    actions.insert(action)
        .then((action) => {
            res.status(success).json(action)
        })
        .catch((error) => {
            res.status(serverError).json({ error: "check your object" })
        })
    })


    actionRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        project_id,
        description,
        notes,
        completed
    } = req.body

    const action = { project_id, description, notes, completed }

    actions.update(id,action)
    .then((action) => {
        res.status(success).json(action)
    })
    .catch((error) => {
        res.status(serverError).json({ error: "check your object" })
    })
})

actionRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;

    actions.remove(id)
    .then((action) => {
        res.status(success).json(action)
    })
    .catch((error) => {
        res.status(serverError).json({ error: "no action at that endpoint" })
    })
})

module.exports = actionRoutes;