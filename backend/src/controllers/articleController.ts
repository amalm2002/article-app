import { Request, Response } from "express";
import { ArticleService } from "../services/articleService";

const articleService = new ArticleService()

export class ArticleController {
    createArticle = async (req: Request, res: Response) => {
        try {
            const { title, description, category, tags, userId } = req.body;
            const image = req.file;

            const article = await articleService.createArticle({
                title,
                description,
                category,
                tags,
                userId,
                image,
            });

            return res.status(201).json({
                message: "Article created successfully!",
                article,
            });
        } catch (error: any) {
            console.error("Error creating article:", error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    }

    getArticles = async (req: Request, res: Response) => {
        try {
            const { userId } = req.query
            const articles = await articleService.getArticles(userId as string)
            return res.status(200).json(articles)
        } catch (error: any) {
            console.error("Error fetching articles:", error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    }

    getPreferenceArticles = async (req: Request, res: Response) => {
        try {
            const { userId, preferences } = req.body;

            const articles = await articleService.getPreferenceArticles(userId, preferences);

            return res.status(200).json({
                message: "Articles fetched successfully",
                articles,
            });
        } catch (error: any) {
            console.error("Error fetching preferences articles:", error);
            res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    }

    articleDetails = async (req: Request, res: Response) => {
        try {
            const { articleId } = req.query;
            const article = await articleService.getArticleDetails(articleId as string);
            res.status(200).json({ data: article });
        } catch (error: any) {
            console.error("Error fetching  articles details:", error);
            res.status(500).json({ message: error.message });
        }
    }

    updateArticle = async (req: Request, res: Response) => {
        try {
            const { articleId } = req.params;
            const updatedArticle = await articleService.updateArticle(articleId, req.body, req.file);
            res.status(200).json({ message: "Article updated", data: updatedArticle });
        } catch (error: any) {
            console.error("Error update articles details:", error);
            res.status(500).json({ message: error.message });
        }
    }

    deleteArticle = async (req: Request, res: Response) => {
        try {
            const { articleId } = req.params;

            const result = await articleService.deleteArticle(articleId);

            if (!result) {
                res.status(404).json({ message: "Article not found" });
                return;
            }

            res.status(200).json({ message: "Article deleted successfully" });
        } catch (error: any) {
            console.error("Error deleting article:", error);
            res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    }

    likeArticle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const updatedArticle = await articleService.likeArticle(id, userId);
            res.status(200).json({ success: true, data: updatedArticle });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    dislikeArticle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { userId } = req.body;
            const updatedArticle = await articleService.dislikeArticle(id, userId);
            res.status(200).json({ success: true, data: updatedArticle });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    fetchBlockedArticles = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const blockedArticles = await articleService.fetchBlockedArticles(userId);
            res.status(200).json(blockedArticles);
        } catch (error: any) {
            console.error("Error fetching blocked articles:", error);
            res.status(500).json({ message: error.message });
        }
    }


    unblockArticle = async (req: Request, res: Response) => {
        try {
            const { articleId } = req.params;
            const unblockedArticle = await articleService.unblockArticle(articleId);
            res.status(200).json({
                message: "Article unblocked successfully",
                article: unblockedArticle,
            });
        } catch (error: any) {
            console.error("Error unblocking article:", error);
            res.status(500).json({ message: error.message });
        }
    }

    blockArticle = async (req: Request, res: Response) => {
        try {
            const { articleId } = req.params;
            const blockedArticle = await articleService.blockArticle(articleId);
            res.status(200).json({
                message: "Article blocked successfully",
                article: blockedArticle,
            });
        } catch (error: any) {
            console.error("Error blocking article:", error);
            res.status(500).json({ message: error.message });
        }
    }

};
