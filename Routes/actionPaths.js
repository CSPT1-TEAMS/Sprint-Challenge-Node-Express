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
           
       })
})















module.exports = router;