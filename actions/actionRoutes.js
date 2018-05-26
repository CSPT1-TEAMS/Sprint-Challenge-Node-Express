const express = require('express');
const actionDb = require('../data/helpers/actionModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    console.log('RES', res.body)
    actionDb
        .get()
        .then(action => {
            res.status(200).json({ action })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    actionDb
        .get(req.params.id)
        .then(action => {
            res.json({ action })
        })
        .catch(error => {
            res.status(500).json({ error: 'This action is unavailable.' })
        })
})

module.exports = router;