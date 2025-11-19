import { ArticleData } from "../../interfaces/article/article.types";

export interface IArticleService {
    createArticle(data: ArticleData): Promise<any>;
    getArticles(userId: string): Promise<any[]>;
    getPreferenceArticles(userId: string, preferences: string[]): Promise<any[]>;
    getArticleDetails(articleId: string): Promise<any>;
    updateArticle(articleId: string, data: any, file?: Express.Multer.File): Promise<any>;
    deleteArticle(articleId: string): Promise<boolean | null>;
    likeArticle(articleId: string, userId: string): Promise<any>;
    dislikeArticle(articleId: string, userId: string): Promise<any>;
    fetchBlockedArticles(userId: string): Promise<any[]>;
    unblockArticle(articleId: string): Promise<any>;
    blockArticle(articleId: string): Promise<any>;
}