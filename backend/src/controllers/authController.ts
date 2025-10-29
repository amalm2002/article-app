import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class AuthController {
    register = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, phone, email, dob, password, confirmPassword, categories } = req.body;

            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

            if (!categories || categories.length === 0) {
                return res.status(400).json({ message: "Please select at least one category" });
            }

            const user = await userService.registerUser({
                firstName,
                lastName,
                phone,
                email,
                dob,
                password,
                preferences: categories,
            });

            return res.status(200).json({
                message: "User registered successfully",
                data: user,
            });
        } catch (error: any) {
            console.error("Register Error:", error);
            return res.status(500).json({
                message: error.message || "Internal server error",
            });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Please fill the email" });
            }
            if (!password) {
                return res.status(400).json({ message: "Passwords dose not exist" });
            }

            const userLogin = await userService.loginUser({
                email,
                password
            })
            return res.status(201).json({
                message: "User logined successfully",
                data: userLogin,
            });
        } catch (error: any) {
            console.error("Login Error:", error);
            return res.status(500).json({
                message: error.message || "Internal server error",
            });
        }
    }
}
