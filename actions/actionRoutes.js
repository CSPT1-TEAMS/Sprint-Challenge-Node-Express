const express = require('express');
const db = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    db
        .get()
        .then(action => {
            res.json({ action })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
})

router.get('/', (req, res) => {
    db
        .get(req.params.id)
        .then(action => {
            res.status(200).json({ action })
        })
        .catch(error => {
            res.status(500).json({ error: 'This action is unavailable.' })
        })
})

router.post('/', (req, res) => {
    const newAction = req.body;
    //trying to search request for projectId **not working**
    // projectDb
    //     .get(req.body.project_id)
    //     .then(project => {
    //         console.log("ID", id)
    //         if (project.length === 0) {
    //             res.status(400).json({error: 'Please enter a valid project id to continue.'})
    //         }
    //     })
    db
        .insert(newAction)
        .then(newAction => {
            res.status(201).json({ newAction })
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while saving the action to the database' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedAction = req.body;
    db
        .get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: "The action with the specified ID does not exist."
                })
                return null;
            }
        })
    db
        .update(id, updatedAction)
        .then(action => {
            res.status(201).json({ action })
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
            if (deleted !== null) {
                res.status(201).json({ deleted })
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'The action could not be removed.' })
        })
})

module.exports = router;