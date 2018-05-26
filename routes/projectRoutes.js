const express = require('express');
const routes = require('../data/helpers/projectModel.js');

const project = express();

project.get('/', (req, res) => {
    routes.get()
        .then(projects => {
           res.status(200).json({ projects });
        })
        .catch(err => {
            res.status(404).json({ err: 'No projects here.' });
        })
});

project.get('/:id', (req, res) => {
    const { id } = req.params;

    routes.get(id)
        .then(projects => {
           res.status(200).json({ projects });
        })
        .catch(err => {
            res.status(204).json({ err: 'No projects at the specified ID.' });
        })
});

project.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    routes.getProjectActions(id)
        .then(actions => {
           res.status(200).json({ actions });
        })
        .catch(err => {
            res.status(204).json({ err: 'No projects at the specified ID.' });
        })
});

project.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description };

    routes.insert(newProject)
        .then(newProject => {
           res.status(201).json({ newProject });
        })
        .catch(err => {
            res.status(400).json({ err: 'Could not post new project.' });
        })
});

project.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const newProject = { id, name, description };

    routes.update(id, newProject)
        .then(newProject => {
            res.status(202).json({ newProject });
        })
        .catch(err => {
            res.status(400).json({ err: 'Could not edit current project.' });
        }) 
});

project.delete('/:id', (req, res) => {
    const { id } = req.params;

    routes.remove(id)
        .then(project => {
            res.status(202).json({ project });
        })
        .catch(err => {
            res.status(400).json({ err: 'Could not delete.' });
        })
});

module.exports = project;