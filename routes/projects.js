const express = require('express')
const db = require('../data/helpers/projectModel');

router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({error: "Error retrieving projects from db"})
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(400).json({error: "Invalid ID, could not retrieve project"})
    })

});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(400).json({error: "Invalid ID, could not retrieve project"})
    })
})

router.post('/', (req, res) => {
  const maxLength = 128;
  const { name, description, completed } = req.body;

  if (name.length > maxLength || description.length > maxLength) {
    return res.status(400).json({error: "Parameter exceeds max length of 128"})
  }

  if (name === undefined || description === undefined) {
    return res.status(400).json({error: "Cannot post! Missing required parameters"})
  }

  const resource = { name, description, completed }

  db.insert(resource)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({error: "Could not post to database"})
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, description, completed } = req.body;
  const updatedProject = { name, description, completed }

  db.update(id, updatedProject)
    .then(project => {
      if (project === null) {
        return res.status(400).json({error: "Invalid, ID not found"})
      }
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({error: "Could not updated resource"})
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(project => {
      db.remove(id)
        .then(response => {
          res.status(200).json(project)
        })
        .catch(err => {
          res.status(500).json({error: "Error deleting resource"})
        })
    })
    .catch(err => {
      res.status(400).json({error: "Invalid, ID does not exists"})
    })
})

module.exports = router;