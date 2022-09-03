import UserSchema from "../../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

const loginController = {
    async login(req,res,next){
        try {
            const isExit = await UserSchema.findOne({email:req.body.email});
            if (!isExit) {
               return res.status(501).json({msg:"User is not authorized"});
            }
            const validatePass = bcrypt.compareSync(req.body.password, isExit.password);
            if(!validatePass){
                return res.status(501).json({msg:"user is not authorized"});
            }

            var token = jwt.sign({ 
                id:isExit._id,
                isadmin:isExit.isadmin
            }, JWT_SECRET);

            const {password,isadmin,__v, ...others} = isExit._doc;

            return res.cookie("access_token",token,{httpOnly:true}).status(201).json(others);

        } catch (error) {
            next(error);
        }
    }
}

export default loginController;
