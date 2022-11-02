import express from "express";
const routes = express.Router();
import { verifyadmin, verifyfunction, verifyuser } from "../middleware/verifyToken";
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

routes.get("/user/view", verifyadmin, userController.viewUsers);
routes.get("/user/view/:id", userController.viewUserById);
routes.put("/user/update/:id",verifyuser, userController.updateUser);
routes.delete("/user/delete/:id",verifyuser, userController.deleteUser);
routes.put("/user/update/password/:id",userController.updatePassword);

//post routes

routes.post("/post/add/:id",postController.addPost);
routes.get("/post/view", postController.viewArticle);
routes.get("/post/view/:id",postController.viewArticleId);
routes.put("/post/update/:id",verifyuser, postController.updatePost);
routes.delete("/post/delete/:id",verifyuser, postController.deletePost);
routes.get("/post/view/user/:id",verifyuser, postController.viewArticleByUser);
routes.get("/post/recent",postController.RecentArticle);

//comment

routes.post("/comment/add/:id",verifyuser, commentController.addComment);
routes.get("/comment/view/:id",commentController.viewCommentByPost);
routes.get("/comment/view",commentController.viewAllComment);
// routes.put("/comment/approve/:id",commentController.approveComment);
routes.delete("/comment/delete/:id",commentController.deleteComment);

export default routes;
