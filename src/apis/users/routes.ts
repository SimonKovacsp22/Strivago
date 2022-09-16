import express from 'express'
import { registerUser,loginUser, getUsers, getMe, getManagedAccomodations } from './index.js'
import { JWTAuthMiddleware } from '../../lib/JWTMiddleware.js'


const usersRouter = express.Router()

usersRouter.post("/register", registerUser)

usersRouter.post("/login", loginUser)

usersRouter.get("/", JWTAuthMiddleware, getUsers)

usersRouter.get("/me", JWTAuthMiddleware, getMe)

usersRouter.get("/me/accomodations", JWTAuthMiddleware, getManagedAccomodations)

export default usersRouter