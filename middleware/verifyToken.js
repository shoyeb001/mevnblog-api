import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const verifyfunction = (req,res,next)=>{
    const acc_token = req.cookies.access_token;
    if(!acc_token){
        return res.json({msg:"Access token not defined"});
    }

    jwt.verify(acc_token, JWT_SECRET, function(err, user) {
        if (err) {
            return res.json({msg:"Token is invalid"});
        }

        req.user = user;
        next();
    });

}

const verifyuser = (req,res,next)=>{
    verifyfunction(req,res,()=>{
        if (req.user.id === req.params.id || req.params.isAdmin) {
            next();
        }
        else{
            return res.json({msg:"User is unauthorized"});
        }
    })
}

const verifyadmin = (req,res,next)=>{
    verifyfunction(req,res,()=>{
        if (req.user.isAdmin) {
            next();
        }
        else{
            return res.json({msg:"user unauthorized"});
        }
    })
}

export {verifyfunction,verifyuser,verifyadmin};
