import { Login, Register } from "@/interfaces/authentication.types";
import { PreferencesUpdate, UpdatePassword, UserDeatils, UserId } from "@/interfaces/user.profile.types";
import axiosConnection from "@/services/axios/axios";


export const backendApi = {
    register: async (data: Register) => {
        const response = await axiosConnection.post("/register", data);
        return response.data;
    },
    login: async (data: Login) => {
        const response = await axiosConnection.post("/login", data)
        return response.data
    },
    getUser: async (data: UserId) => {
        const response = await axiosConnection.get("/get-user", {
            params: data
        })
        return response.data
    },
    updateUser: async (data: UserDeatils) => {
        const response = await axiosConnection.put('/update-user', data)
        return response.data
    },
    changePassword:async (data:UpdatePassword)=>{
        const response =await axiosConnection.patch('/update-password',data)
        return response.data
    },
    preferencesUpdate:async (data:PreferencesUpdate)=>{
        const response=await axiosConnection.patch('/update-preference',data)
        return response.data
    }
}