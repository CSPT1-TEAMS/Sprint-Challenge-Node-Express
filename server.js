const express = require('express');
const helmet = require('helmet');
const actionRoute = require('./routes/actionRoutes');
const l = require('./data/helpers/projectModel');

const server = express();
const port = 5000;

server.use(helmet());
server.use(express.json());


server.use('/actions', actionRoute);

server.get('/project', (req, res) => {
    l.get()
        .then(project => {
           res.send(project);
        })
        .catch(err => {
            res.status(500).json({ err: 'Nothing.' });
        })
})

server.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
});