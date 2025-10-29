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
};
