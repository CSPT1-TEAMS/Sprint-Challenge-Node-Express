const express = require('express');
const actionDb = require('../data/helpers/projectModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    console.log(res.body)
    actionDb
        .get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    actionDb
        .get(req.params.id)
        .then(project => {
            res.json({ project })
        })
        .catch(error => {
            res.status(500).json({ error: 'This project is unavailable.' })
        })
})

module.exports = router;