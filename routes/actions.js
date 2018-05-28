const express = require('express')
const db = require('../data/helpers/actionModel');

router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({error: "Error retrieving actions"})
    })
});

module.exports = router;