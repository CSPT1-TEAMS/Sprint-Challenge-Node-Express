const express = require('express');
const db = require('../data/helpers/projectModel.js');

const router = express.Router();

module.exports = router;

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ errorMessage: msg });
    return;
};

router.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json({ projects })
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const projectsId = req.params.id;
    db.get(projectsId)
        .then(projects => {
            res.json({ projects })
        })
        .catch(err => {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        })
})

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const newProject = req.body;
    if (!name || !description) {
        return sendUserError("Please provide the name and description for the project.", res)
    }
    db.insert(newProject)
        .then(project => {
            res.status(201).json({ project })
            return newProject;
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const newProject = req.body;

    if (!name || !description) {
        return sendUserError("Please provide the name and description for the project.", res);
    }

    db.get(id)
        .then(project => {
            console.log(project)
        })
        .catch(err => {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        });
    db.update(id, newProject)
        .then(project => {
            res.status(200).json({ project })
        })    
        .catch(err => {
            res.status(500).json({ error: "The project information could not be modified." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
        .then( foundProject => {
            project = {...foundProject[0] };
            return dbprojects.remove(id);
        })
        .then( () => {
            return res.status(200).json(project);
        })
        .catch(err => {
            return res.status(404).json({ message: "The project with the specified ID does not exist." })
        });
})