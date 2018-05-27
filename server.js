const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const server = express();

const dbActions = require('./data/helpers/actionModel');

const actionRoutes = require('./actions/actionRoutes.js');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/actions', actionRoutes);

server.listen(5000, () => {
    console.log('**Server running on port 5000**');
});

