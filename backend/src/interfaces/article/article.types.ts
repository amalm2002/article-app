import { ObjectId } from "mongodb";
import mongoose, { Types } from "mongoose";


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

export interface ArticleResponseDTO {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  likes: number;
  dislikes: number;
  likedBy: any;
  dislikedBy: any;
  userId: string | ObjectId;
  isActive: boolean;
}


export interface ArticleDocument {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  likes: number;
  dislikes: number;
  likedBy: mongoose.Types.ObjectId[];
  dislikedBy: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleDetails {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  likes: number;
  dislikes: number;
  likedBy: ObjectId[];
  dislikedBy: ObjectId[];
  userId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
  isActive: boolean;
}
