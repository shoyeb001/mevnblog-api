import UserSchema from "../../model/UserModel";
import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/user')
    },
    filename: function (req, file, cb) {
      const image = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
      cb(null, image);
    }
});

const handelMultipartData = multer({
    storage,
    limits: {fileSize: 1000000 * 5},
}).single("image");


const userController = {
    async viewUsers(req,res,next){
        try {
            const users = await UserSchema.find();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async viewUserById(req,res,next){
        try {
            const user = await UserSchema.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    


    updateUser(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            const id = req.params.id;
            if(error){
                return console.log("error");
            }

            const {name,email,about} = req.body;
            let filepath;

            if (req.file) {
                const data = await UserSchema.findById({_id:id});
                fs.unlink(`${appRoot}/${data.image}`,(error)=>{
                    console.log("image deleted");
                });
            }

            try {
                const update = await UserSchema.findByIdAndUpdate(
                    {_id:id},
                    {
                        name,
                        email,
                        about,
                        ...(req.file && {image:filepath}),
                    },
                    {new:true}
                );
                res.status(200).json({msg:"User updated Successfully"});
            } catch (error) {
                next(error);
            }
            
        })
    },

    deleteUser(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            const id = req.params.id;
            if(error){
                console.log(error);
                
            }
            const data = await UserSchema.findById({_id:id});
                fs.unlink(`${appRoot}/${data.image}`,(error)=>{
                    console.log("Image Deleted");
                });
            try {
                await UserSchema.findByIdAndDelete({_id:id});
                res.status(201).json({msg:"User deleted successfully."});
            } catch (error) {
                next(error);
            }    
        })
    }


    
}

export default userController;
