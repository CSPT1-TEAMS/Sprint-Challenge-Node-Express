const express = require('express');

const server = express();
const port = 8000;

const actionRoutes = require('./Routes/actionPaths');

server.use(express.json());
server.use('/actions', actionRoutes);


server.get('/', (req, res) => {
    res.send(`=== SERVER RUNNING ON PORT ${port} ===`);
    console.log("Console log working!");
});


server.listen(port, () => {
    console.log(` === API IS RUNNING ON PORT ${port} === `)
})