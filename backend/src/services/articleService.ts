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
            isActive: true
        });

        return articles;
    };

    async getArticleDetails(articleId: string) {
        const article = await Article.findById(articleId);
        if (!article) throw new Error("Article not found");
        return article;
    }

    async updateArticle(articleId: string, data: any, file?: Express.Multer.File) {
        const article = await Article.findById(articleId);
        if (!article) throw new Error("Article not found");

        article.title = data.title;
        article.description = data.description;
        article.category = data.category;
        article.tags = data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [];

        if (file) {
            if (article.imageUrl) {
                const publicId = article.imageUrl.split("/").pop()?.split(".")[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(`articles/${publicId}`);
                }
            }

            const uploaded: any = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "articles" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });

            article.imageUrl = uploaded.secure_url;
        }

        await article.save();
        return article;
    }

    async deleteArticle(articleId: string) {
        const article = await Article.findById(articleId);
        if (!article) return null;

        if (article.imageUrl) {
            const publicId = this.extractPublicId(article.imageUrl);
            if (publicId) {
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.error("Error deleting image from Cloudinary:", err);
                }
            }
        }

        await Article.findByIdAndDelete(articleId);
        return true;
    }

    private extractPublicId(imageUrl: string): string | null {
        try {
            const parts = imageUrl.split("/");
            const fileName = parts.pop() || "";
            const folderName = parts.pop() || "";
            const publicId = `${folderName}/${fileName.split(".")[0]}`;
            return publicId;
        } catch (error) {
            console.error("Error extracting public ID:", error);
            return null;
        }
    }

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

    async fetchBlockedArticles(userId: string) {
        try {
            const articles = await Article.find({ userId }, { isActive: false });
            return articles;
        } catch (error: any) {
            throw new Error("Failed to fetch blocked articles");
        }
    }

    async unblockArticle(articleId: string) {
        try {
            const article = await Article.findById(articleId);
            if (!article) {
                throw new Error("Article not found");
            }

            article.isActive = true;
            await article.save();
            return article;
        } catch (error: any) {
            throw new Error("Failed to unblock article");
        }
    }

    async blockArticle(articleId: string) {
        try {
            const article = await Article.findById(articleId);
            if (!article) {
                throw new Error("Article not found");
            }

            article.isActive = false;
            await article.save();
            return article;
        } catch (error: any) {
            throw new Error("Failed to block article");
        }
    }

}