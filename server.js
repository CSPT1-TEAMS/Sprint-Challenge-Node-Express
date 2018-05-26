const express = require('express');
const helmet = require('helmet');
const actionRoute = require('./routes/actionRoutes');
const projectRoute = require('./routes/projectRoutes');

const server = express();
const port = 5000;

server.use(helmet());
server.use(express.json());


server.use('/actions', actionRoute);
server.use('/projects', projectRoute);

server.listen(port, () => {
    console.log(` === APP LISTENING IN ${port} === `);
});