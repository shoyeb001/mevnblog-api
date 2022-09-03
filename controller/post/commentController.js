import PostSchema from "../../model/PostModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const commentController = {
    async addComment(req,res,next){
        const id = req.params.id;

        const {user_id, content}  = req.body;

        try {
            const update = await PostSchema.findByIdAndUpdate(
                {_id:id},
                {
                  comment:[{
                    commenter_id : user_id,
                    content,
                  }]
                },
                {new:true}
            );
            res.status(200).json({msg:"Comment added successfully"});
        } catch (error) {
            next(error);
        }
    },
}

export default commentController;
