import express from 'express';
import userController from '../controllers/userController';
import postController from '../controllers/postController';
import commentController from '../controllers/commentController';
import likeController from '../controllers/likeController';
import ratingController from '../controllers/ratingController';
import { authenticateToken } from '../middleware/authAuthentication';

const router = express.Router();

//Routes from users
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.delete("/users", authenticateToken, userController.deleteById);
router.get("/users", authenticateToken, userController.getUser);

//Routes from posts
router.post("/posts", authenticateToken, postController.create);
router.get("/posts", authenticateToken, postController.getAll);
router.get("/posts/:id_post", authenticateToken, postController.getById);
router.delete("/posts", authenticateToken, postController.deleteAll);
router.delete("/posts/:id_post", authenticateToken, postController.deleteById);
router.put("/posts/:id_post", authenticateToken, postController.updateById);

//Routes from comments
router.post("/comments", authenticateToken, commentController.create);
router.put("/comments/:id_comment", authenticateToken, commentController.updateById);
router.get("/comments/:id_post", authenticateToken, commentController.getAllByPostId);
router.delete("/comments/:id_comment", authenticateToken, commentController.deleteById);

//Routes from likes
router.post("/likes", authenticateToken, likeController.create);
router.delete("/likes/:postId", authenticateToken, likeController.remove);
router.get("/likes/count/:postId", authenticateToken, likeController.count);
router.get("/likes/:postId", authenticateToken, likeController.getAllLikesByPost);

//routes from ratings
router.post("/ratings", authenticateToken, ratingController.create);
router.delete("/ratings/:postId", authenticateToken, ratingController.remove);
router.get("/ratings/:postId", authenticateToken, ratingController.getAllRatingByPost);
router.get("/ratings/average/:postId", authenticateToken, ratingController.average);
router.put("/ratings", authenticateToken, ratingController.update);

export default router;


