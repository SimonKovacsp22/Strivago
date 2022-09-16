import createHttpError from 'http-errors'
import AccomodationModel from './model.js'
import {RequestHandler} from "express"

export const getAccomodations: RequestHandler = async (req,res,next) => {
    try {

        const accomodations = await AccomodationModel.find()

        res.send(accomodations)
        
    } catch (error) {
        next(error)
    }
}
export const getAccomodationsByHost: RequestHandler = async (req,res,next) => {
    try {

        if(!req.params.userId) {
            next(createHttpError(404,`Host with Id: ${req.params.userId} not found!`))
        }

        const accomodations = await AccomodationModel.find({host: req.params.userId})

        res.send(accomodations)
        
    } catch (error) {
        next(error)
    }
}
export const createAccomodation: RequestHandler = async (req,res,next) => {
    try {

        const accomodation = new AccomodationModel(req.body)

        const {_id} = await accomodation.save()
        
        res.status(201).send({_id})
        
    } catch (error) {
        next(error)
    }
}