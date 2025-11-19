import { Login, Register } from "../../interfaces/user/authentication.types";
import { UpdatePassword, updateThePreference, UserDetils } from "../../interfaces//user/user.profile.types";

export interface IUserService {
    registerUser(userData: Register): Promise<any>;
    loginUser(userLoginData: Login): Promise<any>;
    getUser(userId: string): Promise<any>;
    updateUser(userData: UserDetils): Promise<any>;
    changePassword(updatePasswordData: UpdatePassword): Promise<any>;
    updatePreference(preferenceData: updateThePreference): Promise<any>;
}