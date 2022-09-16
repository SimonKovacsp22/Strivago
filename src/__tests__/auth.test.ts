import supertest from "supertest"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {server} from "../server"
import UserModel from '../apis/users/model'
import { verifyAccessToken } from '../lib/tokens'

dotenv.config()

export const validUser = {
    name:"Simon",
    surname:"Kovac",
    email:"simon.kovacsp22@gmail.com",
    password:"donkeySmart",
    role:"host"
}

const client = supertest(server)

beforeAll( async ()=> {
    if(process.env.MONGO_CON_URL)  await mongoose.connect(process.env.MONGO_CON_URL)
    const newUser =new UserModel(validUser)
    await newUser.save()
})

afterAll( async () => {
    await UserModel.deleteMany()
    await mongoose.connection.close()
})


describe("testing authorization endpoints",  ()=>{
    test("should test that /register returns 201 and valid id ",async () => {
     const response = await client.post("/users/register").send(validUser)
     expect(response.status).toBe(201)
     expect(response.body).toHaveProperty("_id")
    })

    test("should test that /login returns 200 and valid JWT token ",async () => {
        const response = await client.post("/users/login").send({email:validUser.email,password:validUser.password})
        expect(response.status).toBe(200)
        const token = await verifyAccessToken(response.body.accessToken)
        expect(token?._id).toBeDefined()

        
       })
       test("should test that /login returns 401 when request is invalid ",async () => {
        const response = await client.post("/users/login").send({email:"hi",password:validUser.password})
        expect(response.status).toBe(401)
        

        
       })



})