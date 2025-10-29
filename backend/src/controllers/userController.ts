import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {

    getUser = async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId as string;
            if (!userId) {
                return res.status(400).json({ message: "No user Id found" });
            }
            const user = await userService.getUser(userId)
            return res.status(201).json({
                message: "User fetched successfully",
                data: user,
            });
        } catch (error: any) {
            console.error("Fetch User Error:", error);
            return res.status(500).json({
                message: error.message || "Internal server error",
            });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { userId, firstName, lastName, phone, email, dob } = req.body;

            const phoneRegex = /^[1-9][0-9]{9}$/;

            if (!phoneRegex.test(phone)) {
                return res.status(400).json({
                    message: "Invalid phone number. It must be 10 digits and not start with 0.",
                });
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Invalid email format. Only Gmail addresses are allowed.",
                });
            }

            const userData = await userService.updateUser({
                userId,
                firstName,
                lastName,
                phone,
                email,
                dob
            })
            return res.status(201).json({
                message: "User details updated successfully",
            });
        } catch (error: any) {
            console.error("Update User Details Error:", error);
            return res.status(500).json({
                message: error.message || "Internal server error",
            });
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            console.log(req.body)

            const { userId, currentPassword, newPassword } = req.body

            const updatePassword = await userService.changePassword({
                userId,
                currentPassword,
                newPassword
            })

            return res.status(200).json({ message: 'Password change successfully' })

        } catch (error: any) {
            console.error("Failed to change password:", error);
            return res.status(500).json({
                message: error.message || "Internal server error",
            });
        }
    }

    updatePreference = async (req: Request, res: Response) => {

    }
}
