import mongoose from "mongoose";
import bcrypt from "bcrypt"

const {model,Schema} = mongoose

const userSchema = new Schema({
    name:{ type:String },
    surname:{ type:String,},
    email:{ type:String, required:true},
    password:{ type:String, required:false},
    role:{type:String, enum:["host","guest"],default:"guest"},
    // blogPosts:[{type:mongoose.Types.ObjectId,ref:"Accomodation"}]
},
{timestamps: true},
)



userSchema.pre("save", async function(next){

    const currentUser = this

    const plainPW = currentUser.password

    if(currentUser.isModified("password")){

        const hash = await bcrypt.hash(plainPW, 10)

        currentUser.password = hash
    }

    next()
})

userSchema.methods.toJSON = function () {

    const userDocument = this
    const user = userDocument.toObject()

    delete user.password
    delete user.__v
    return user
}

userSchema.static("checkCredentials", async function (email, plainPW){

    const user = await this.findOne({email})

    if(user) {

        const isMatch = await bcrypt.compare(plainPW, user.password)

        if(isMatch) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}) 

export default model("User",userSchema)