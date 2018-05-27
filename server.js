const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projectRoutes = require('./routes/projects');
const actionRoutes = require('./routes/actions')

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);
server.listen(5005, () => {
  console.log("API RUNNING ON PORT 5005")
});
