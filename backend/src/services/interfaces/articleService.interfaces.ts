import { ArticleData, ArticleDetails, ArticleDocument, ArticleResponseDTO } from "../../interfaces/article/article.types";

export interface IArticleService {
    createArticle(data: ArticleData): Promise<ArticleResponseDTO>;
    getArticles(userId: string): Promise<ArticleDocument[]>;
    getPreferenceArticles(userId: string, preferences: string[]): Promise<ArticleDocument[]>;
    getArticleDetails(articleId: string): Promise<ArticleDetails>;
    updateArticle(articleId: string, data: any, file?: Express.Multer.File): Promise<ArticleResponseDTO>;
    deleteArticle(articleId: string): Promise<boolean | null>;
    likeArticle(articleId: string, userId: string): Promise<ArticleResponseDTO>;
    dislikeArticle(articleId: string, userId: string): Promise<ArticleResponseDTO>;
    fetchBlockedArticles(userId: string): Promise<ArticleDocument[]>;
    unblockArticle(articleId: string): Promise<ArticleResponseDTO>;
    blockArticle(articleId: string): Promise<ArticleResponseDTO>;
}