import bcrypt from "bcrypt";
import User from "../models/User";
import { Login, Register } from "../interfaces/user/authentication.types";
import { UpdatePassword, UserDetils } from "../interfaces/user/user.profile.types";

export class UserService {

    async registerUser(userData: Register) {
        const { email, phone, password } = userData;

        if (!email || !phone || !password) {
            throw new Error("Email, phone, and password are required.");
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            throw new Error("User already exists with this email or phone.");
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        if (!passwordRegex.test(password)) {
            throw new Error(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
        });

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }


    async loginUser(userLoginData: Login) {
        const { email, password } = userLoginData;

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("User dose not exists with this email ");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error("Invalid password")
        }

        const { password: _, ...userWithoutPassword } = user.toObject();

        return userWithoutPassword;
    }

    async getUser(userId: string) {

        const user = await User.findById(userId)

        if (!user) {
            throw new Error("User Not Found  ");
        }

        return user
    }

    async updateUser(userData: UserDetils) {
        const { userId, firstName, lastName, phone, email, dob } = userData

        const user = await User.findById(userId)

        if (!user) {
            throw new Error('User Not Found')
        }

        await User.findByIdAndUpdate(userId, {
            $set: { firstName, lastName, phone, email, dob }
        }, { new: true }
        )
        return { message: 'User details updated successfully!' }
    }

    async changePassword(updatePasswordData: UpdatePassword) {
        const { userId, currentPassword, newPassword } = updatePasswordData;

        if (!userId || !currentPassword || !newPassword) {
            throw new Error("All fields (userId, currentPassword, newPassword) are required");
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            throw new Error(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error("Current password is incorrect");
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new Error("New password cannot be the same as the old password");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(
            userId,
            { $set: { password: hashedPassword } },
            { new: true }
        );

        return { message: "Password changed successfully!" };
    }

}
