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

module.exports = router;