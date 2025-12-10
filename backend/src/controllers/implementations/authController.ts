import { Request, Response } from "express";
import { IUserService } from "../../services/interfaces/userService.interfces";
import { IAuthController } from "../interfaces/authController.interface";
import { STATUS_CODE } from "../../constants/statusCodes";
import { MESSAGE } from "../../constants/messages";


export class AuthController implements IAuthController {

    constructor(private _userService: IUserService) { }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { firstName, lastName, phone, email, dob, password, confirmPassword, categories } = req.body;

            if (password !== confirmPassword) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({ message: MESSAGE.PASSWORD_MISMATCH });
            }

            if (!categories || categories.length === 0) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({ message: MESSAGE.CATEGORY_REQUIRED });
            }

            const user = await this._userService.registerUser({
                firstName,
                lastName,
                phone,
                email,
                dob,
                password,
                preferences: categories,
            });

            return res.status(STATUS_CODE.OK).json({
                message: MESSAGE.USER_REGISTERED,
                data: user,
            });
        } catch (error: any) {
            console.error("Register Error:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({ message: MESSAGE.EMAIL_REQUIRED });
            }
            if (!password) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({ message: MESSAGE.PASSWORD_REQUIRED });
            }

            const userLogin = await this._userService.loginUser({
                email,
                password
            })
            return res.status(STATUS_CODE.OK).json({
                message: MESSAGE.LOGIN_SUCCESS,
                data: userLogin,
            });
        } catch (error: any) {
            console.error("Login Error:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }
}
