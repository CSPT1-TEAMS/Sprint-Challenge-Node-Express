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
    console.log(newProject)
    db
        .insert(newProject)
        .then(newProject => {
            res.status(201).json({ newProject })
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while saving the project to the database' })
        })
})

module.exports = router;