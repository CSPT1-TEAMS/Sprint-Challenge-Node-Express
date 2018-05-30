const express = require('express');
const db = require('../data/helpers/actionModel.js');

const router = express.Router();

module.exports = router;

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ errorMessage: msg });
    return;
};

router.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json({ actions })
        })
        .catch(err => {
            res.status(500).json({ error: "The actions information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const actionsId = req.params.id;
    db.get(actionsId)
        .then(actions => {
            res.json({ actions })
        })
        .catch(err => {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        })
})

router.post('/', (req, res) => {
    console.log(req.body);
    const project_id = req.body.project_id;
    const description = req.body.description;
    const newAction = req.body;
    if (!project_id || !description) {
        return sendUserError("Please provide the Project ID and description for the action.", res)
    }
    db.insert(newAction)
        .then(action => {
            res.status(201).json({ action })
            return newAction;
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the action to the database" })
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const project_id = req.body.project_id;
    const description = req.body.description;
    const newAction = req.body;

    if (!project_id || !description) {
        return sendUserError("Please provide the Project ID and description for the action.", res);
    }

    db.get(id)
        .then(action => {
            console.log(action)
        })
        .catch(err => {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        });
    db.update(id, newAction)
        .then(action => {
            res.status(200).json({ action })
        })    
        .catch(err => {
            res.status(500).json({ error: "The action information could not be modified." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
        .then( foundAction => {
            action = {...foundAction[0] };
            return dbActions.remove(id);
        })
        .then( () => {
            return res.status(200).json(action);
        })
        .catch(err => {
            return res.status(404).json({ message: "The action with the specified ID does not exist." })
        });
})