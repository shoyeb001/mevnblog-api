import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name:{type:String,required:true, minlength:8, maxlength:25},
   email:{type:String, required:true},
   password:{type:String, required:true},
   isadmin:{type:Boolean, default:false},
   image:{type:String, required:true},
   about:{type:String, default:"I am new user"}
},{timestamps:true});

export default mongoose.model("User",UserSchema);
