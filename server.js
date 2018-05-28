const express = require('express');
const cors = require('cors');

const actionRoutes = require('./routes/actions');
const projectRoutes = require('./routes/projects');


const server = express();

server.use(cors());
server.use(express.json());


server.use('/api/actions', actionRoutes)
server.use('/api/projects', projectRoutes)


const port = 5000;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})