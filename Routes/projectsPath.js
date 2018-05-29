const express = require('express');
const router = express.Router();
const projectsData = require('../data/helpers/projectModel');


router.get('/', (req, res) => {
    projectsData.get() 
      .then(projects => {
          res.status(200).json({ projects });
      })
      .catch(err => {
          res.status(500).json({ error: "Error while attempting to retrieve projects from database." });
      })
})

router.get('/:id', (req, res) => {
    const projectId = req.params.id;
    
})







module.exports = router;