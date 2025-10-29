import mongoose, { Document, Schema, Types } from "mongoose";

export interface IArticle extends Document {
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
    likedBy: Types.ObjectId[];
    dislikedBy: Types.ObjectId[];
    userId: Types.ObjectId;
    tags?: string[];
    isActive:boolean
}

const ArticleSchema = new Schema<IArticle>(
    {
        title: String,
        description: String,
        category: String,
        imageUrl: String,
        tags: [{ type: String }],
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
        dislikedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export const Article = mongoose.model<IArticle>("Article", ArticleSchema);
