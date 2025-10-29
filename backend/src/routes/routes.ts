import express, { Request, Response } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";

const router = express.Router();
const authController = new AuthController();
const userController = new UserController()

// Authentication Routes
router.post("/register", authController.register);
router.post('/login', authController.login)

// Profile Section
router.get('/get-user',userController.getUser)
router.put('/update-user',userController.updateUser)
router.patch('/update-password',userController.changePassword)
router.patch('/update-preference',userController.updatePreference)


export default router