import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRouter from './apis/users/routes.js'
import accomodationsRouter from './apis/accomodations/routes.js'
import { badRequestHandler,unauthorizedHandler,genericServerErrorHandler,notFoundHandler,forbiddenErrorHandler  } from './lib/errorHandlers.js'


export const server = express()




server.use(cors())
server.use(express.json())

server.use("/users", usersRouter)
server.use("/accomodations", accomodationsRouter)
server.use("/test", (req,res,next) => {
    res.send({hello: "world"})
})

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(forbiddenErrorHandler)
server.use(notFoundHandler)
server.use(genericServerErrorHandler)


