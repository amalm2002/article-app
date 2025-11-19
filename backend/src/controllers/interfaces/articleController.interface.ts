import { Request, Response } from "express";

export interface IArticleController {
  createArticle(req: Request, res: Response): Promise<any>;
  getArticles(req: Request, res: Response): Promise<any>;
  getPreferenceArticles(req: Request, res: Response): Promise<any>;
  articleDetails(req: Request, res: Response): Promise<any>;
  updateArticle(req: Request, res: Response): Promise<any>;
  deleteArticle(req: Request, res: Response): Promise<any>;
  likeArticle(req: Request, res: Response): Promise<any>;
  dislikeArticle(req: Request, res: Response): Promise<any>;
  fetchBlockedArticles(req: Request, res: Response): Promise<any>;
  unblockArticle(req: Request, res: Response): Promise<any>;
  blockArticle(req: Request, res: Response): Promise<any>;
}