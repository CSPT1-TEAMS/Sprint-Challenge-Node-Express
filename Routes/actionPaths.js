const express = require('express');
const router = express.Router();
const actionData = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    actionData.get()
      .then(actions => {
          res.status(200).json({  actions });
      })
      .catch(err => {
          res.status(500).json({ error: "Error while attempting to retrieve actions from database." });
      })
})

router.get('/:id', (req, res) => {
    const actionId = req.params.id;
     actionData.get(actionId) 
       .then(action => {
           res.json({ action });
       })
       .catch(err => {
           res.status(404).json({ error: `The action with id ${actionId} does not exist!` });
       })
})

router.post('/', (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes || !req.body.completed) {
        res.status(400).json({ error: "Please provide project_id, description, notes, and completed (true || false) for new action!" });
    }
    actionData.insert(req.body) 
      .then(response => {
          res.status(201).json({ ...req.body, ...response });
      })
      .catch(err => {
          response.status(500).json({ err })
      })
})

router.put('/:id', (req, res) => {
    
})















module.exports = router;