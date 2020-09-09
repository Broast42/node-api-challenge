const express = require("express")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

router.get("/", (req, res, next) => {
    actions.get()
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            next(error)
        })
})

router.get("/:id", validateId(), (req, res, next) => {
    actions.get(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.post("/", validateBody(), (req, res, next) => {
    actions.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.put("/:id", validateBody(), validateId(), (req, res, next) => {
    actions.update(req.params.id, req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.delete("/:id", validateId(), (req, res, next) => {
    actions.remove(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

//middleware

function validateId() {
    return (req, res, next) => {
        actions.get(req.params.id)
            .then(result => {
                if(result) {
                    next()
                }else{
                    res.status(400).json({message: "invalid actions id"})
                }
            })
            .catch(error => {
                next(error)
            })
    }
}

function validateBody() {
    return (req, res, next) => {
       if(!req.body.description || !req.body.notes || !req.body.project_id){
        res.status(400).json({message: "missing data: actions must have descripition, notes and post_id."})  
       }else{
           next()
       }
    }
}


module.exports = router
