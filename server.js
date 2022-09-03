import express from "express";
import {PORT} from "./config/index";
import connection from "./utils/connection";
import routes from "./routes/routes";
import errorHandeler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cros from "cors";
import path from "path";

global.appRoot = path.resolve(__dirname);

const app = express();


app.use(cookieParser());
app.use(cros());
app.use(express.urlencoded({ extended: false})); // used for understand img

app.use(express.json());
app.use(routes);

app.listen(PORT, 
    async ()=>{
        console.log(`listening to port ${PORT}`);
        await connection();
    }
);
