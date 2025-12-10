import { Login, Register, UserDocumentDTO, UserResponseDTO } from "../../interfaces/user/authentication.types";
import { UpdatePassword, updateThePreference, UserDetils } from "../../interfaces//user/user.profile.types";

export interface IUserService {
    registerUser(userData: Register): Promise<UserResponseDTO>;
    loginUser(userLoginData: Login): Promise<UserResponseDTO>;
    getUser(userId: string): Promise<UserDocumentDTO>;
    updateUser(userData: UserDetils): Promise<{ message: string }>;
    changePassword(updatePasswordData: UpdatePassword): Promise<{ message: string }>;
    updatePreference(preferenceData: updateThePreference): Promise<UserDocumentDTO>;
}