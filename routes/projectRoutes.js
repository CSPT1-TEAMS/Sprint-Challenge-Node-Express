let express = require('express')
let db = require('../data/helpers/projectModel')

let router = express.Router()

router.get('/all', (req, res) => {
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(e => res.status(500).json({ error: `Error: ${e}` }))
})

router.get('/:id', ({ params }, res) => {
  db.get(params.id)
    .then(project => res.status(200).json(project))
    .catch(e => res.status(404).json({ error: `Error: ${e}` }))
})

module.exports = router
