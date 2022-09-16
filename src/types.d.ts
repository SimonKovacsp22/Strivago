import mongoose from "mongoose"

export type TokenPayload = {
    _id: mongoose.ObjectId,
    role: "host"|"guest"
}

export interface User {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: "host" | "guest"
}

export interface UserDocument extends mongoose.Document,User {}
  

export interface UsersModel extends mongoose.Model<UserDocument> {
    checkCredentials(email:string, plainPw:string):Promise< UserDocument | null>
}