import mongoose from "mongoose";

const {model, Schema} = mongoose
const accomodationSchema = new Schema({
     name:{type:String, required: true},
     host:{ type:Schema.Types.ObjectId, ref:"User", required: true},
     description:{type:String},
     maxGuests:{type:Number, required:true},
     city:{type:String, required:true}
})

export default model("Accomodations", accomodationSchema)