const express = require('express');
const actionDb = require('../data/helpers/actionModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    console.log(res.body)
    actionDb
        .get()
        .then(action => {
            res.status(200).json({ action })
        })
        .catch(error => {
            res.status(500).json({ error })
        })

})

module.exports = router;