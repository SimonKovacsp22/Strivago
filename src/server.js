import express from 'express'
import listEndpoints from 'express-list-endpoints'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRouter from './apis/users/routes.js'
import accomodationsRouter from './apis/accomodations/routes.js'
import { badRequestHandler,unauthorizedHandler,genericServerErrorHandler,notFoundHandler,forbiddenErrorHandler  } from './lib/errorHandlers.js'


const server = express()

const port = process.env.PORT


server.use(cors())
server.use(express.json())

server.use("/users", usersRouter)
server.use("/accomodations", accomodationsRouter)

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(forbiddenErrorHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)


mongoose.connect(process.env.MONGO_CON_URL)

mongoose.connection.on("connected", () => {
    console.log("success")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log("server is listening on port:",port)
    })
})