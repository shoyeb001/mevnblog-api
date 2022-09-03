import PostSchema from "../../model/PostModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/post')
    },
    filename: function (req, file, cb) {
      const image = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
      cb(null, image);
    }
});

const handelMultipartData = multer({
    storage,
    limits: {fileSize: 100000000 * 5},
}).single("thumbnail");

const postController = {
    async addPost(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            if(error){
                console.log("image not uploaded");
            }

            const user_id = req.params.id;

            const {title,description,content,tags} = req.body;

            if(!req.file){
               return  res.status(501).json({msg:"Thumbnail is required"});
            }

            const thumbnail = req.file.path;
            const data = new PostSchema({
                title,
                description,
                thumbnail,
                content,
                user_id,
                tags
            });
    
            try {
                const savepost = data.save();

                return res.status(200).json({msg:"Post added successfully"});
            } catch (error) {
                next(error);
            }
        });
       
    },

    async viewArticle(req,res,next){
       try {
        const article = await PostSchema.find();
        return res.status(200).json(article);
       } catch (error) {
        next(error);
       }
    },

    async viewArticleId(req,res,next){
        const id = req.params.id;

        try {
            const article = await PostSchema.findById({_id:id});
            return res.status(200).json(article);
        } catch (error) {
            next(error);
        }
    },

    async updatePost(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            if (error) {
                console.log(error);
            }
            const user_id = req.params.id;
            const {title,description,content,tags} = req.body;
            let filepath;

            if (req.file) {
                const data = await PostSchema.findById({_id:user_id});
                fs.unlink(`${appRoot}/${data.image}`,(error)=>{
                    console.log("image deleted");
                });
                filepath = req.file.path;

            }

            try {
                const update = await PostSchema.findByIdAndUpdate(
                    {_id:user_id},
                    {
                       title,
                       description,
                       content,
                       tags,
                        ...(req.file && {thumbnail:filepath}),
                    },
                    {new:true}
                );
                res.status(200).json({msg:"User updated Successfully"});
            } catch (error) {
                next(error);
            }

        });
    },

    async deletePost(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            if (error) {
                console.log(error);
            }

            const id = req.params.id;

            const data = await PostSchema.findById({_id:id});
            fs.unlink(`${appRoot}/${data.image}`,(error)=>{
                console.log("Image Deleted");
            });
           try {
            await PostSchema.findByIdAndDelete({_id:id});
            res.status(201).json({msg:"Post deleted successfully."});
           } catch (error) {
            next(error);
           }    
        })
    }

}

export default postController;
