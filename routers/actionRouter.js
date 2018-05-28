const express = require('express')
const router = express.Router()
const db = require("../data/helpers/actionModel")

const handleError = (err, req, res, next) => {
    return res.status(err.status).json(err.message)
}

router.get("/", (req, res, next) => {
    db.get()
    .then(actions => {
        return res.status(200).json(actions)
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.get("/:actionId", (req, res, next) => {
    const { actionId } = req.params
    db.get(actionId)
    .then(action => {
        return res.status(200).json(action)
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                message: `No action found with ID: ${actionId}`
            }
        })
    })
})

router.post("/", (req, res, next) => {
    const action = req.body
    db.insert(action)
    .then(action => {
        return res.status(201).json(action)
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.delete("/:actionId", (req, res, next) => {
    const { actionId } = req.params
    db.remove(actionId)
    .then(count => {
        if (count < 1) {
            next({
                status: 404,
                message: {
                    message: `No action found with ID: ${actionId}`
                }
            })
        } else {
            db.get()
            .then(actions => {
                return res.status(200).json(actions)
            })
            .catch(error => {
                next({
                    status: 404,
                    message: {
                        error: `Something went wrong. Please try again later.`
                    }
                })
            })
        }
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.put("/:actionId", (req, res, next) => {
    const { actionId } = req.params
    const changes = req.body
    db.update(actionId, changes)
    .then(action => {
        if(action === null) {
            next({
                status: 404,
                message: {
                    message: `No action found with ID: ${actionId}`
                }
            })
        } else {
            return res.status(200).json(action)
        }
    })
    .catch(error => {
        next({
            status: 404,
            message: {
                error: `Something went wrong. Please try again later.`
            }
        })
    })
})

router.use(handleError)

module.exports = router;
