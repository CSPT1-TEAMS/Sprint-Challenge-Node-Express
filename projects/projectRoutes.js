const express = require('express');
const db = require('../data/helpers/projectModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    db
        .get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
})

router.get('/:id', (req, res) => {
    db
        .get(req.params.id)
        .then(project => {
            res.json({ project })
        })
        .catch(error => {
            res.status(500).json({ error: 'This project is unavailable.' })
        })
})

router.post('/', (req, res) => {
    const newProject = req.body;
    if (!newProject.description || newProject.description.length > 128) {
        res.status(400).json({message: 'Must include a description no longer than 128 characters.'})
    }
    if (!newProject.name || newProject.name.length > 128) {
        res.status(400).json({ message: 'Must include a name no longer than 128 characters.' })
    }
    db
        .insert(newProject)
        .then(newProject => {
            res.status(201).json({ newProject })
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while saving the project to the database' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;
    db
        .get(req.params.id)
        .then(project => {
            if (!project) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
                return null;
            }
        })
    db    
        .update(id, updatedProject)
        .then(updatedProject => {
            res.status(201).json({ updatedProject })
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while updating the database' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let deleted;
    db
        .remove(id)
        .then(deleted => {
            res.status(201).json({ deleted })
        })
        .catch(error => {
            res.status(500).json({ error: 'The project could not be removed.' })
        })
})

module.exports = router;