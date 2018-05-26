const express = require('express');

const db = require('../data/helpers/actionModel')


const router = express.Router();
router.get('/actions', (req, res) => {
    db.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({error: "Error retrieving actions"})
    })
})