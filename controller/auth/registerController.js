import UserSchema from "../../model/UserModel";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/user')
//     },
//     filename: function (req, file, cb) {
//       const image = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
//       cb(null, image);
//     }
// });

// const handelMultipartData = multer({
//     storage,
//     limits: {fileSize: 1000000 * 5},
// }).single("image");




const registerController = {
    async register(req,res,next){
        // handelMultipartData(req,res,async(error)=>{
        //     if(error){
        //         console.log("image not uploaded");
        //     }
            const {name,email,password,isadmin,about} = req.body;
            // let filepath;
            // if(!req.file){
              const filepath="uploads\\user\\userimage.png";
            // }else{
            //     filepath = req.file.path;
            // }
            //getting file path

            //hash password
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(password, salt);

            const newuser = new UserSchema({
                name,
                email,
                password: hashpassword,
                isadmin,
                about,
                image:filepath
            });

            try {
                const save = newuser.save();
                res.status(200).json({msg:"user registered successfully"});
            } catch (error) {
                next(error);
            }
        // })
    },
}

export default registerController;
