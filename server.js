const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const server = express();

const actionRoutes = require('./routes/actionRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

server.listen(5000, () => {
    console.log('**Server running on port 5000**');
});

