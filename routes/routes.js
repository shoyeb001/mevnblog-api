import express from "express";
const routes = express.Router();
import {heathCheckController, registerController, loginController, userController, postController, commentController} from "../controller/index";

routes.get("/", (req, res) => {
    res.json({
        msg: "This is articleme api",
        author: "Sk Shoyeb",
        lisence: "MIT"
    })
});

routes.get("/healthcheck",heathCheckController.healthCheck);
routes.post("/user/register", registerController.register);
routes.post("/user/login", loginController.login);

//user routes

routes.get("/user/view", userController.viewUsers);
routes.get("/user/view/:id", userController.viewUserById);
routes.post("/user/update/:id", userController.updateUser);
routes.delete("/user/delete/:id",userController.deleteUser);

//post routes

routes.post("/post/add/:id",postController.addPost);
routes.get("/post/view",postController.viewArticle);
routes.get("/post/view/:id",postController.viewArticleId);
routes.put("/post/update/:id",postController.updatePost);
routes.delete("/post/delete/:id",postController.deletePost);

//comment

routes.put("/comment/add/:id",commentController.addComment);


export default routes;
