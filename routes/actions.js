const express = require('express')
const db = require('../data/helpers/actionModel');

router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      res.status(500).json({error: "Error retrieving actions from db"})
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(400).json({error: "Invalid ID, could not retrieve action"})
    })

});

router.post('/', (req, res) => {
  const maxLength = 128;
  const { project_id, description, notes, completed } = req.body;

  if (description.length > maxLength) {
    return res.status(400).json({error: "Parameter exceeds max length of 128"})
  }

  if (project_id === undefined || description === undefined) {
    return res.status(400).json({error: "Cannot post! Missing required parameters"})
  }

  const resource = { project_id, description, notes, completed }
  db.insert(resource)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Could not post to database"})
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { project_id, description, notes, completed } = req.body;
  const updatedAction = { project_id, description, notes, completed }

  db.update(id, updatedAction)
    .then(action => {
      if (action === null) {
        return res.status(400).json({error: "Invalid, ID not found"})
      }
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(500).json({error: "Could not updated resource"})
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      db.remove(id)
        .then(response => {
          res.status(200).json(action)
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