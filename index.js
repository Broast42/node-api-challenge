const express = require('express')
//import routes for projects
const projectsRouter = require('./projects/projectRoutes')
//import routes for actions
const actionsRouter = require('./actions/actionsRouter')

const port = 4000
const server = express()

server.use(express.json())


server.get('/', (req, res) => {
    res.send(`<h2>Server is running</h2>`)
})

//routes for projects
server.use("/projects", projectsRouter)
//routes for actions
server.use("/actions", actionsRouter)


//default error result
server.use((err,req,res,next) => {
    console.log("Error", res)
    res.status(500).json({
		message: "An error occured",
	})
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
