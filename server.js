const express = require('express');
const cors = require('cors');

const actionRoutes = require('./routes/actionRoutes');
const projectRoutes = require('./routes/projectRoutes');


const server = express();

server.use(cors());
server.use(express.json());


server.use('/api/actions', actionRoutes)
server.use('/api/projects', projectRoutes)


const port = 5000;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})