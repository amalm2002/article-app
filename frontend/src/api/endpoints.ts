import { ArticlePreference } from "@/interfaces/article.types";
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
    changePassword: async (data: UpdatePassword) => {
        const response = await axiosConnection.patch('/update-password', data)
        return response.data
    },
    preferencesUpdate: async (data: PreferencesUpdate) => {
        const response = await axiosConnection.patch('/update-preference', data)
        return response.data
    },
    createArticle: async (data: any) => {
        const response = await axiosConnection.post('/article/create', data)
        return response.data
    },
    fetchUserArticles: async (userId: string) => {
        const response = await axiosConnection.get('/get-articles', {
            params: { userId }
        })
        return response.data
    },
    userPreferenceArticles: async (data: ArticlePreference) => {
        const response = await axiosConnection.post('/get-preference/articles', data)
        return response.data
    },
    handleLike: async (articleId: string, userId: string) => {
        const response = await axiosConnection.patch(`/article/${articleId}/like`, { userId });
        return response.data;
    },
    handleDislike: async (articleId: string, userId: string) => {
        const response = await axiosConnection.patch(`/article/${articleId}/dislike`, { userId });
        return response.data;
    },
    fetchArticleDetails: async (articleId: string) => {
        const response = await axiosConnection.get(`/article-details`, {
            params: { articleId },
        });
        return response.data;
    },
    updateArticle: async (articleId: string, formData: FormData) => {
        const response = await axiosConnection.put(`/update-article/${articleId}`, formData);
        return response.data;
    },
    deleteArticle: async (articleId: string) => {
        const response = await axiosConnection.delete(`/delete/${articleId}`)
        return response.data
    },
    fetchBlockedArticles: async (userId: string) => {
        const response = await axiosConnection.get(`/articles/blocked/${userId}`);
        return response.data;
    },
    unblockArticle: async (articleId: string) => {
        const response = await axiosConnection.put(`/articles/unblock/${articleId}`);
        return response.data;
    },
    blockArticle: async (articleId: string) => {
        const response = await axiosConnection.put(`/articles/block/${articleId}`);
        return response.data;
    },


}