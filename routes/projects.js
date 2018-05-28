const express = require('express')
const db = require('../data/helpers/projectModel');

router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({error: "Error retrieving projects"})
    })
});

module.exports = router;