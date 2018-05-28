const express = require('express')
const cors = require('cors');
const projectRouter = require('./routers/projectRouter')
const actionRouter = require('./routers/actionRouter')
const server = express()
server.listen(3000,
    console.log("=== APP SERVER LISTENING AT PORT 3000 ===")
)

server.use(express.json())
server.use(cors())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)