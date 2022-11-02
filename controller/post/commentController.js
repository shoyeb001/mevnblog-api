import CommentScema from "../../model/CommentModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const commentController = {
    async addComment(req,res,next){

        const {post_id, user_id, comment}  = req.body;

        try {
            const comments = new CommentScema({
                post_id,
                comment,
                user_id
            });

            const newcomment  = await comments.save();
            res.status(200).json({msg:"Comment posted Successfully."});
        } catch (error) {
            next(error);
        }
    },

    async viewAllComment(req,res,next){
        try {
            const comment = await CommentScema.find();
            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    },

    async deleteComment(req,res,next){
        const id = req.params.id;
        try {
            await CommentScema.findByIdAndDelete({_id:id});
            res.status(200).json({msg:"Comment removed"});
        } catch (error) {
            next(error);
        }
    },

    // async approveComment(req,res,next){
    //     const id = req.params.id;
    //     try {
    //         await CommentScema.findByIdAndUpdate({_id:id},{status:"approved"},{new:true});
    //         res.status(200).json({msg:"Comment Approved"});
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    async viewCommentByPost(req,res,next){
        const post_id = req.params.id;
        try {
            const comments = await CommentScema.find({post_id}).sort({updatedAt:'desc'});
            res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }
}

export default commentController;
