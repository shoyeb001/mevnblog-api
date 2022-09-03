import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    post_id:{type:String, required:true},
    comment:{type:String, required:true}
},{timestamps:true});

export default mongoose.model("Comment",CommentSchema);
