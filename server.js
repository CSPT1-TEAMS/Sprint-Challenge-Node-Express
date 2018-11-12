let express = require('express')
let server = express()
let projectRoutes = require('./routes/projectRoutes')
let PORT = 4333


server.use(express.json())

server.use('/api/projects', projectRoutes)

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))


