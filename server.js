const express = require('express');
const logger = require('morgan');

const actionRouter = require('./routes/actions');
const projectRouter = require('./routes/projects')

const server = express();
const port = 1963;


server.use(logger())
server.use(express.json())

server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
})