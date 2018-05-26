const express = require('express');
const db = require('../data/helpers/actionModel.js');

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

router.get('/:id', (req, res) => {
    db
        .get(req.params.id)
        .then(action => {
            res.json({ action })
        })
        .catch(error => {
            res.status(500).json({ error: 'This action is unavailable.' })
        })
})

router.post('/', (req, res) => {
    const newAction = req.body;
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
        .get(req.params.id)
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
            res.status(500).json({ error: 'There was an error while updating the database'})
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
            res.status(500).json({ error: 'The action could not be removed.' })
        })
})

module.exports = router;