import { DB_URL } from "../config/index";
import mongoose from "mongoose";

const connection = () =>{
    try {
        mongoose.connect(DB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connection;
