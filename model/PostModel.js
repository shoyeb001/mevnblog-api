import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{type:String, required:true, maxlength:100},
    description:{type:String, required:true, maxlength:200},
    thumbnail:{type:String, required:true},
    content:{type:String, required:true},
    user_id:{type:String, required:true},
    tags:{type:[String], required:true, indexd:true},
},{timestamps:true});

export default mongoose.model("Post",PostSchema);
