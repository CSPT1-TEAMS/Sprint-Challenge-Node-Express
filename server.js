const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const server = express();

const dbActions = require('./data/helpers/actionModel');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.listen(5000, () => {
    console.log('**Server running on port 5000**');
});


server.get('/api/actions', (req, res) => {
    dbActions.get()
        .then(actions => {
            res.status(200).json({ actions })
        })
        .catch(err => {
            res.status(500).json({ error: "The actions information could not be retrieved." })
        })
})

server.get('/api/actions/:id', (req, res) => {
    const actionsId = req.params.id;
    dbActions.get(actionsId)
        .then(actions => {
            res.json({ actions })
        })
        .catch(err => {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        })
})

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ errorMessage: msg });
    return;
};

server.post('/api/actions/', (req, res) => {
    console.log(req.body);
    const project_id = req.body.project_id;
    const description = req.body.description;
    const newAction = req.body;
    if (!project_id || !description) {
        return sendUserError("Please provide the Project ID and description for the action.", res)
    }
    dbActions.insert(newAction)
        .then(action => {
            res.status(201).json({ action })
            return newAction;
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the action to the database" })
        })
});

server.put('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    const project_id = req.body.project_id;
    const description = req.body.description;
    const newAction = req.body;

    if (!project_id || !description) {
        return sendUserError("Please provide the Project ID and description for the action.", res);
    }

    dbActions.get(id)
        .then(action => {
            console.log(action)
        })
        .catch(err => {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        });
    dbActions.update(id, newAction)
        .then(action => {
            res.status(200).json({ action })
        })    
        .catch(err => {
            res.status(500).json({ error: "The action information could not be modified." })
        })
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    dbActions.get(id)
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

