import { Request, Response } from "express";
import { IUserController } from "../interfaces/userController.interface";
import { IUserService } from "../../services/interfaces/userService.interfces";
import { STATUS_CODE } from "../../constants/statusCodes";
import { MESSAGE } from "../../constants/messages";


export class UserController implements IUserController {

    constructor(private _userService: IUserService) { }

    getUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userId = req.query.userId as string;
            if (!userId) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({ message: MESSAGE.USER_NOT_FOUND });
            }
            const user = await this._userService.getUser(userId)
            return res.status(STATUS_CODE.OK).json({
                message: MESSAGE.USER_FETCH_SUCCESS,
                data: user,
            });
        } catch (error: any) {
            console.error("Fetch User Error:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId, firstName, lastName, phone, email, dob } = req.body;

            const phoneRegex = /^[1-9][0-9]{9}$/;

            if (!phoneRegex.test(phone)) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    message: MESSAGE.INVALID_PHONE,
                });
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

            if (!emailRegex.test(email)) {
                return res.status(STATUS_CODE.BAD_REQUEST).json({
                    message: MESSAGE.INVALID_EMAIL,
                });
            }

            const userData = await this._userService.updateUser({
                userId,
                firstName,
                lastName,
                phone,
                email,
                dob
            })
            return res.status(STATUS_CODE.CREATED).json({
                message: MESSAGE.USER_UPDATE_SUCCESS,
            });
        } catch (error: any) {
            console.error("Update User Details Error:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }

    changePassword = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { userId, currentPassword, newPassword } = req.body

            const updatePassword = await this._userService.changePassword({
                userId,
                currentPassword,
                newPassword
            })

            return res.status(STATUS_CODE.OK).json({ message: MESSAGE.PASSWORD_CHANGED })

        } catch (error: any) {
            console.error("Failed to change password:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }

    updatePreference = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { userId, preference } = req.body

            const updateThePreference = await this._userService.updatePreference({
                userId,
                preference
            })

            return res.status(STATUS_CODE.OK).json({ message: MESSAGE.PREFERENCE_UPDATED, user: updateThePreference })

        } catch (error: any) {
            console.error("Failed to update the preference:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }
}
