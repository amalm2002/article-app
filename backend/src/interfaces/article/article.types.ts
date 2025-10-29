export interface ArticleData {
    title: string;
    description: string;
    category: string;
    tags?: string[];
    userId: string;
    image?: Express.Multer.File;
}