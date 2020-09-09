const express = require("express")
const projects = require("../data/helpers/projectModel")

const router = express.Router()

router.get("/", (req, res, next) => {
    projects.get()
        .then(results => {
            res.status(200).json(results)
        })
        .catch(error => {
            next(error)
        })
})

router.get("/:id", validateId(), (req, res, next) => {
    projects.get(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.post("/", validateBody(), (req, res, next) => {
    projects.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.put("/:id", validateBody(), validateId(), (req, res, next) => {
    projects.update(req.params.id, req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.delete("/:id", validateId(), (req, res, next) => {
    projects.remove(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.get("/:id/actions", validateId(), (req, res, next) => {
    projects.getProjectActions(req.params.id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
} )


//middleware

function validateId() {
    return (req, res, next) => {
        projects.get(req.params.id)
            .then(result => {
                if(result) {
                    next()
                }else{
                    res.status(400).json({message: "invalid project id"})
                }
            })
            .catch(error => {
                next(error)
            })
    }
}

function validateBody() {
    return (req, res, next) => {
       if(!req.body.name || !req.body.description){
        res.status(400).json({message: "missing data: project must have both name and descripition"})  
       }else{
           next()
       }
    }
}




module.exports = router

