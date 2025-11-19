import { ObjectId } from "mongodb";

export interface ArticleData {
    title: string;
    description: string;
    category: string;
    tags?: string[];
    userId: string;
    image?: Express.Multer.File;
}


export interface Article {
  _id: ObjectId;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  dislikes: number;
  likedBy: ObjectId[];
  dislikedBy: ObjectId[];
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isActive: boolean;
}