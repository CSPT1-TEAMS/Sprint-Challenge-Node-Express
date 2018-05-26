const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const router = express.Router();

const action = require('./data/helpers/actionModel');
const project = require('./data/helpers/projectModel');
const projectRoutes = require('./projects/projectRoutes.js');
const actionRoutes = require('./actions/actionRoutes.js');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/project', projectRoutes);
server.use('/api/action', actionRoutes);

server.listen(5000, () => {
    console.log('### APP running on port 5000 ###')
})

module.exports = server;