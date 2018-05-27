const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)

module.exports = { // exports used by server as db.[functionName]()
  getProjects,
  getProjectById,
  insertProject,
  updateProject,
  removeProject,
  getActions,
  getActionById,
  insertAction,
  updateAction,
  removeAction
}

// Project Functions
function getProjects () {
  return db('projects')
}

function getProjectById (id) {
  return db('projects').where({ id: Number(id) })
}

function insertProject (project) {
  return db('projects')
    .insert(project)
    .then(ids => ({ id: ids[0] }))
}

function updateProject (id, project) {
  return db('projects')
    .where('id', Number(id))
    .update(project)
}

function removeProject (id) {
  return db('projects')
    .where('id', Number(id))
    .del()
}

// Action Functions
function getActions () {
  return db('actions')
}

function getActionById (id) {
  return db('actions').where({ id: Number(id) })
}

function insertAction (action) {
  return db('actions')
    .insert(action)
    .then(ids => ({ id: ids[0] }))
}

function updateAction (id, action) {
  return db('actions')
    .where('id', Number(id))
    .update(action)
}

function removeAction (id) {
  return db('actions')
    .where('id', Number(id))
    .del()
}
