const express = require('express');
const routes = require('../data/helpers/actionModel.js');

const action = express();

action.get('/', (req, res) => {

    routes.get()
        .then(action => {
            res.status(200).json({ action });
        })
        .catch(err => {
            res.status(500).json({ err: 'Nothing.' });
        }) 
});

action.get('/:id', (req, res) => {
    const { id } = req.params;

    routes.get(id)
        .then(action => {
            res.status(200).json({ action });
        })
        .catch(err => {
            res.status(204).json({ err: 'Nothing.' });
        }) 
});

action.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    const actionContent = { project_id, description, notes };

    routes.insert(actionContent)
        .then( actionContent => {
            res.status(201).json({ actionContent });
        })
        .catch(err => {
            res.status(400).jsoon({ err: 'Could not post to server.'});
        })
});

action.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };

    routes.update(id, newAction)
        .then(newAction => {
            res.status(202).json({ newAction });
        })
        .catch(err => {
            res.status(400).json({ err: 'Could not edit current action.' });
        }) 
});

action.delete('/:id', (req, res) => {
    const { id } = req.params;

    routes.remove(id)
        .then(action => {
            res.status(202).json({ action });
        })
        .catch(err => {
            res.status(404).json({ err: 'Nothing to delete.' });
        })
});

module.exports = action;