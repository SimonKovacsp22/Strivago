import createHttpError from 'http-errors'
import UserModel from './model'
import AccomodationModel from '../accomodations/model'
import { createAccessToken, verifyAccessToken } from '../../lib/tokens'
import {RequestHandler} from "express"
import { IUserRequest } from '../../lib/JWTMiddleware'

export const registerUser: RequestHandler = async (req,res,next) => {

    try {
        
    const user = new UserModel(req.body)

    const {_id} =await user.save()

    res.status(201).send({_id})

    } catch(error) {

        next(error)
    }
}

export const loginUser: RequestHandler = async (req,res,next) => {

   try {

    const {email,password} = req.body
     
    const user = await UserModel.checkCredentials(email,password)

    if(!user) {

        next(createHttpError(401, "Incorrent combination of credentials"))
    } else {

        const token = await createAccessToken({_id: user._id, role: user.role})

        res.send({accessToken: token})
    }

    

  


    
   } catch (error) {
     console.log(error)
     next(error)
   }
}

export const getUsers: RequestHandler = async (req,res,next) => {

    try {
        
    const users = await UserModel.find()

    res.send(users)

    } catch(error) {

        next(error)
    }
}

export const getMe: RequestHandler = async (req: IUserRequest,res,next) => {

    try {
        
    const user = await UserModel.findById(req.user?._id)

    if(!user) {
        next(createHttpError(404,`author with id: ${req.user?._id} was not found`))
    }

    res.send(user)

    } catch(error) {

        next(error)
    }
}

export const getManagedAccomodations: RequestHandler = async (req:IUserRequest,res,next) => {

    try {
        
    const acomodations = await AccomodationModel.find({host: req.user?._id})

    if(!acomodations) {
        next(createHttpError(404,`accomodations were not found for ${req.user?._id}`))
    }

    res.send(acomodations)

    } catch(error) {

        next(error)
    }
}