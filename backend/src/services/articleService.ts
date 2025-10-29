import { Types } from "mongoose";
import cloudinary from "../config/cloudinary";
import { ArticleData } from "../interfaces/article/article.types";
import { Article } from "../models/Article";



export class ArticleService {
    async createArticle(data: ArticleData) {
        const { title, description, category, tags, userId, image } = data;

        let imageUrl = "";

        if (image) {
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "articles" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(image.buffer);
            });

            imageUrl = uploadResult.secure_url;

        }

        const article = await Article.create({
            title,
            description,
            category,
            tags,
            userId,
            imageUrl,
        });

        return article;
    }

    async getArticles(userId: string) {
        const articles = await Article.find({ userId })
        return articles
    }

    async getPreferenceArticles(userId: string, preferences: string[]) {
        const articles = await Article.find({
            category: { $in: preferences },
            // isActive: true
        });

        return articles;
    };

    async likeArticle(articleId: string, userId: string) {
        const article = await Article.findById(articleId);
        if (!article) throw new Error("Article not found");

        const userObjectId = new Types.ObjectId(userId);

        const alreadyLiked = article.likedBy.some(
            (id) => id.toString() === userObjectId.toString()
        );
        const alreadyDisliked = article.dislikedBy.some(
            (id) => id.toString() === userObjectId.toString()
        );

        if (alreadyLiked) {
            article.likedBy = article.likedBy.filter(
                (id) => id.toString() !== userObjectId.toString()
            );
            article.likes -= 1;
        } else {
            if (alreadyDisliked) {
                article.dislikedBy = article.dislikedBy.filter(
                    (id) => id.toString() !== userObjectId.toString()
                );
                article.dislikes -= 1;
            }
            article.likedBy.push(userObjectId);
            article.likes += 1;
        }

        await article.save();
        return article;
    }

    async dislikeArticle(articleId: string, userId: string) {
        const article = await Article.findById(articleId);
        if (!article) throw new Error("Article not found");

        const userObjectId = new Types.ObjectId(userId);

        const alreadyLiked = article.likedBy.some(
            (id) => id.toString() === userObjectId.toString()
        );
        const alreadyDisliked = article.dislikedBy.some(
            (id) => id.toString() === userObjectId.toString()
        );

        if (alreadyDisliked) {
            article.dislikedBy = article.dislikedBy.filter(
                (id) => id.toString() !== userObjectId.toString()
            );
            article.dislikes -= 1;
        } else {
            if (alreadyLiked) {
                article.likedBy = article.likedBy.filter(
                    (id) => id.toString() !== userObjectId.toString()
                );
                article.likes -= 1;
            }
            article.dislikedBy.push(userObjectId);
            article.dislikes += 1;
        }

        await article.save();
        return article;
    }
}