const express = require('express');
const router = express.Router();
const projectsData = require('../data/helpers/projectModel');


router.get('/', (req, res) => {
    projectsData.get()
      .then(projects => {
          res.status(200).json({  projects });
      })
      .catch(err => {
          res.status(500).json({ error: "Error while attempting to retrieve projects from database." });
      })
})

router.get('/:id', (req, res) => {
    const projectId = req.params.id;
     projectsData.get(projectId) 
       .then(action => {
           res.json({ action });
       })
       .catch(err => {
           res.status(404).json({ error: `The action with id ${projectId} does not exist!` });
       })
})

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ error: "Please provide name and description for new project!" });
    }
    projectsData.insert(req.body) 
      .then(response => {
          res.status(201).json({ ...req.body, ...response });
      })
      .catch(err => {
          response.status(500).json({ err })
      })
})

router.put('/:id', (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ error: "Please provide name and description when updating project!" });
    }
    projectsData.update(req.params.id, req.body)
      .then(response => {
          if (response === 0) {
              return res.status(404).json({ message: `The project with the specified ID ${req.params.id} does not exist!` });
          }
          res.json(response);
      })
      .catch(err => {
          response.status(500).json({ message: "The project information could not be modified!" });
      })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let project;
    projectsData.remove(id)
      .then(response => {
          if (response.length === 0) return res.status(404).json({ message: `The project with id ${id} does not exist.`});
          res.status(200).json({ message: "=== PROJECT DELETED ==="});
      })
      .catch(err => {
          response.status(500).json({ error: err });
      })
})







module.exports = router;