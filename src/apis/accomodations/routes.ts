import express from 'express'
import { JWTAuthMiddleware} from '../../lib/JWTMiddleware'
import {adminMiddleware} from '../../lib/adminMiddleware'
import { getAccomodations, getAccomodationsByHost, createAccomodation } from './index'

const accomodationsRouter = express.Router()

accomodationsRouter.get("/", getAccomodations)

accomodationsRouter.get("/:userId", getAccomodationsByHost)

accomodationsRouter.post("/",JWTAuthMiddleware,adminMiddleware, createAccomodation)

export default accomodationsRouter