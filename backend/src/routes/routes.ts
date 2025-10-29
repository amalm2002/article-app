import express from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { ArticleController } from "../controllers/articleController";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();
const authController = new AuthController();
const userController = new UserController();
const articleController = new ArticleController();

// Authentication Routes
router.post("/register", authController.register);
router.post('/login', authController.login)

// Profile Section
router.get('/get-user', userController.getUser)
router.put('/update-user', userController.updateUser)
router.patch('/update-password', userController.changePassword)
router.patch('/update-preference', userController.updatePreference)

// Article section
router.post('/article/create', upload.single("image"), articleController.createArticle);
router.get('/get-articles', articleController.getArticles)
router.post('/get-preference/articles', articleController.getPreferenceArticles)

// Like / Dislike Article
router.patch('/article/:id/like', articleController.likeArticle);
router.patch('/article/:id/dislike', articleController.dislikeArticle);

export default router