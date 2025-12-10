import { Request, Response } from "express";
import { IArticleService } from "../../services/interfaces/articleService.interfaces";
import { IArticleController } from "../interfaces/articleController.interface";
import { STATUS_CODE } from "../../constants/statusCodes";
import { MESSAGE } from "../../constants/messages";


export class ArticleController implements IArticleController {

    constructor(private _articleService: IArticleService) { }

    createArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { title, description, category, tags, userId } = req.body;
            const image = req.file;

            const article = await this._articleService.createArticle({
                title,
                description,
                category,
                tags,
                userId,
                image,
            });

            return res.status(STATUS_CODE.CREATED).json({
                message: MESSAGE.ARTICLE_CREATED,
                article,
            });
        } catch (error: any) {
            console.error("Error creating article:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }

    }

    getArticles = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId } = req.query
            const articles = await this._articleService.getArticles(userId as string)
            return res.status(STATUS_CODE.OK).json(articles)
        } catch (error: any) {
            console.error("Error fetching articles:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }

    getPreferenceArticles = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId, preferences } = req.body;

            const articles = await this._articleService.getPreferenceArticles(userId, preferences);

            return res.status(STATUS_CODE.OK).json({
                message: MESSAGE.ARTICLE_FETCHED,
                articles,
            });
        } catch (error: any) {
            console.error("Error fetching preferences articles:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                message: error.message || MESSAGE.INTERNAL_ERROR,
            });
        }
    }

    articleDetails = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { articleId } = req.query;
            const article = await this._articleService.getArticleDetails(articleId as string);
            return res.status(STATUS_CODE.OK).json({ data: article });
        } catch (error: any) {
            console.error("Error fetching  articles details:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error.message });
        }
    }

    updateArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { articleId } = req.params;
            const updatedArticle = await this._articleService.updateArticle(articleId, req.body, req.file);
            return res.status(STATUS_CODE.OK).json({ message: MESSAGE.ARTICLE_UPDATED, data: updatedArticle });
        } catch (error: any) {
            console.error("Error update articles details:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error.message });
        }
    }

    deleteArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { articleId } = req.params;

            const result = await this._articleService.deleteArticle(articleId);

            if (!result) {
                return res.status(STATUS_CODE.NOT_FOUND).json({ message: MESSAGE.ARTICLE_NOT_FOUND });

            }

            return res.status(STATUS_CODE.OK).json({ message: MESSAGE.ARTICLE_DELETED });
        } catch (error: any) {
            console.error("Error deleting article:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error.message || MESSAGE.INTERNAL_ERROR });
        }
    }

    likeArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const updatedArticle = await this._articleService.likeArticle(id, userId);
            return res.status(STATUS_CODE.OK).json({ success: true, data: updatedArticle });
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ success: false, message: error.message });
        }
    };

    dislikeArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const updatedArticle = await this._articleService.dislikeArticle(id, userId);
            return res.status(STATUS_CODE.OK).json({ success: true, data: updatedArticle });
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({ success: false, message: error.message });
        }
    }

    fetchBlockedArticles = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId } = req.params;
            const blockedArticles = await this._articleService.fetchBlockedArticles(userId);
            return res.status(STATUS_CODE.OK).json(blockedArticles);
        } catch (error: any) {
            console.error("Error fetching blocked articles:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error.message });
        }
    }


    unblockArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { articleId } = req.params;
            const unblockedArticle = await this._articleService.unblockArticle(articleId);
            return res.status(STATUS_CODE.OK).json({
                message: MESSAGE.ARTICLE_UNBLOCKED,
                article: unblockedArticle,
            });
        } catch (error: any) {
            console.error("Error unblocking article:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error.message });
        }
    }

    blockArticle = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { articleId } = req.params;
            const blockedArticle = await this._articleService.blockArticle(articleId);
            return res.status(STATUS_CODE.OK).json({
                message: MESSAGE.ARTICLE_BLOCKED,
                article: blockedArticle,
            });
        } catch (error: any) {
            console.error("Error blocking article:", error);
            return res.status(STATUS_CODE.SERVER_ERROR).json({ message: error.message });
        }
    }

};
