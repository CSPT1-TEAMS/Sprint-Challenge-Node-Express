// import node modules
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// const logger = (req, res, next) => {
//   console.log('LOGGER:', req.url);
//   next()
// }

const db = require('./data/db.js')
// const db = require('./data/dbConfig.js')

// implement common error handler
const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err)
    res.status(404).json({error: err})
  }
}

// add your server code starting here
const server = express()

// apply middleware
server.use(express.json())
server.use(cors())
server.use(helmet())

// ☞ f0591e23-f934-4eec-9079-df10d29b54bd
// user route handlers
server.get('/api/projects', (req, res) => {
  db.getProjects() // <-- CRUD action/operation server query db
    .then(response => {
      res.status(200)
      res.json(response) // <-- finish REST operation
    })
    .catch(err => {
      res.status(500).json({ error: ' PROBLEM RETRIEVING DATA'
    })
})

/*
server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params
  db.getProjectById(id)
    .then(project => res.status(200).json({project: project[0]}))
    .catch(errorHandler => res.status(500).json({ err }))
})

server.insertProject('/api/projects', (req, res) => {
  const projectBody = req.body
  if (projectBody.title === undefined || projectBody.contents === undefined) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the project.' })
  }
  db.insert(projectBody)
    .then(projectId => {
      db.findById(projectId.id)
        .then(project => res.status(201).json(project))
        .catch(errorHandler => res.status(500).json({ error: 'There was an error while saving the project to the database' }))
    })
    .catch(errorHandler => res.status(500).json({ error: 'There was an error while saving the project to the database' }))
})

server.updateProject('/api/projects/:id', (req, res) => {
  const { id } = req.params
  const projectBody = req.body
  if (projectBody.title === undefined && projectBody.contents === undefined) {
    return res.status(400).json({ errorMessage: 'Please provide title aor contents for the project.' })
  }

  db.update(id, projectBody)
    .then(num => {
      if (num === 0) {
        res.status(404).json({ message: 'The project with the specified ID does not exist.' })
      } else {
        db.findById(id)
          .then(project => res.status(200).json(project))
          .catch(errorHandler => res.status(500).json({ error: 'The project information could not be modified.' }))
      }
    })
    .catch(errorHandler => res.status(500).json({ error: 'The project information could not be modified.' }))
})
server.removeProject('/api/projects', (req, res) => {
  const { id } = req.params
  let foundProject
  db.findById(id)
    .then(projects => {
      if (projects.length === 0) {
        res.status(404).json({ message: 'The project with the specified ID does not exist.' })
      } else {
        foundProject = projects[0]
        db.remove(id)
          .then(numOfDeleted => { res.status(200).json(foundProject) })
          .catch(errorHandler => res.status(500).json({ error: 'The project could not be removed' }))
      }
    })
    .catch(errorHandler => res.status(500).json({ error: 'The project could not be removed' }))
})

server.getActions('/api/actions', (req, res) => {
  db.find()
    .then(actions => res.status(200).json(actions))
    .catch(errorHandler => res.status(500).json({err}))
})

server.getActionById('/api/actions/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(action => res.status(200).json({action: action[0]}))
    .catch(errorHandler => res.status(500).json({ err }))
})

server.insertAction('/api/actions', (req, res) => {
  const actionBody = req.body
  if (actionBody.title === undefined || actionBody.contents === undefined) {
    return res.status(400).json({ errorMessage: 'Please provide title and contents for the action.' })
  }
  db.insert(actionBody)
    .then(actionId => {
      db.findById(actionId.id)
        .then(action => res.status(201).json(action))
        .catch(errorHandler => res.status(500).json({ error: 'There was an error while saving the action to the database' }))
    })
    .catch(errorHandler => res.status(500).json({ error: 'There was an error while saving the action to the database' }))
})

server.updateAction('/api/actions/:id', (req, res) => {
  const { id } = req.params
  const actionBody = req.body
  if (actionBody.title === undefined && actionBody.contents === undefined) {
    return res.status(400).json({ errorMessage: 'Please provide title aor contents for the action.' })
  }
  db.update(id, actionBody)
    .then(num => {
      if (num === 0) {
        res.status(404).json({ message: 'The action with the specified ID does not exist.' })
      } else {
        db.findById(id)
          .then(action => res.status(200).json(action))
          .catch(errorHandler => res.status(500).json({ error: 'The action information could not be modified.' }))
      }
    })
    .catch(errorHandler => res.status(500).json({ error: 'The action information could not be modified.' }))
})

server.removeAction('/api/actions', (req, res) => {
  const { id } = req.params
  let foundAction
  db.findById(id)
    .then(actions => {
      if (actions.length === 0) {
        res.status(404).json({ message: 'The action with the specified ID does not exist.' })
      } else {
        foundAction = actions[0]
        db.remove(id)
          .then(numOfDeleted => { res.status(200).json(foundAction) })
          .catch(errorHandler => res.status(500).json({ error: 'The action could not be removed' }))
      }
    })
    .catch(errorHandler => res.status(500).json({ error: 'The action could not be removed' }))
*/
})

// dot notation ==>

// server.get('/', logger(), (req, res) => {
//   res.json({ api: 'running'})
// })

server.use(errorHandler)
// define server
const port = 8000
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`))
