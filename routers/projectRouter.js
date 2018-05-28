const express = require('express')
const router = express.Router()
const db = require("../data/helpers/projectModel")

const handleError = (err, req, res, next) => {
    return res.status(err.status).json(err.message)
}

router.get("/", (req, res, next) => {
    db.get()
    .then(projects => {
        return res.status(200).json(projects)
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.get("/:id", (req, res, next) => {
    const { id } = req.params
    db.get(id)
    .then(project => {
        return res.status(200).json(project)
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                message: `No project found with ID: ${id}`
            }
        })
    })
})

router.get("/:id/actions", (req, res, next) => {
    const { id } = req.params
    db.get(id)
    .then(_ => {
        db.getProjectActions(id)
            .then(project => {
                return res.status(200).json(project)
        })
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                message: `No project found with ID: ${id}`
            }
        })
    })
})

router.post("/", (req, res, next) => {
    const project = req.body
    db.insert(project)
    .then(project => {
        return res.status(201).json(project)
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params
    db.remove(id)
    .then(count => {
        if (count < 1) {
            next({
                status: 404,
                message: {
                    message: `No project found with ID: ${id}`
                }
            })
        } else {
            db.get()
            .then(projects => {
                return res.status(200).json(projects)
            })
            .catch(error => {
                next({
                    status: 500,
                    message: {
                        error: `Something went wrong. Please try again later.`
                    }
                })
            })
        }
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.put("/:id", (req, res, next) => {
    const { id } = req.params
    const changes = req.body
    db.update(id, changes)
    .then(project => {
        if(project === null) {
            next({
                status: 404,
                message: {
                    message: `No project found with ID: ${id}`
                }
            })
        } else {
            return res.status(200).json(project)
        }
    })
    .catch(error => {
        next({
            status: 500,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.use(handleError)

module.exports = router;
