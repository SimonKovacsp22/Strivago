import supertest from "supertest"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {server} from "../server"
import UserModel from '../apis/users/model'

dotenv.config()

const validUser = {}

const client = supertest(server)

beforeAll( async ()=> {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL!)
    const newUser = await new UserModel(validUser)
    await newUser.save
})

afterAll( async () => {
    await UserModel.deleteMany()
    await mongoose.connection.close()
})


describe("testing api", ()=>{
    test("testing ", () => {
  
    })
})