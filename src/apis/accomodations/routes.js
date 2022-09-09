import express from 'express'
import { JWTAuthMiddleware} from '../../lib/JWTMiddleware.js'
import {adminMiddleware} from '../../lib/adminMiddleware.js'
import { getAccomodations, getAccomodationsByHost, createAccomodation } from './index.js'

const accomodationsRouter = express.Router()

accomodationsRouter.get("/", getAccomodations)

accomodationsRouter.get("/:userId", getAccomodationsByHost)

accomodationsRouter.post("/",JWTAuthMiddleware,adminMiddleware, createAccomodation)

export default accomodationsRouter