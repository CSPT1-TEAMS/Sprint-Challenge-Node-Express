const express = require('express');

const server = express();
const port = 8000;

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`=== SERVER RUNNING ON PORT ${port} ===`);
    console.log("It's working!");
});


server.listen(port, () => {
    console.log(` === API IS RUNNING ON PORT ${port} === `)
})