import { Request, Response } from "express";

export interface IArticleController {
  createArticle(req: Request, res: Response): Promise<Response>;
  getArticles(req: Request, res: Response): Promise<Response>;
  getPreferenceArticles(req: Request, res: Response): Promise<Response>;
  articleDetails(req: Request, res: Response): Promise<Response>;
  updateArticle(req: Request, res: Response): Promise<Response>;
  deleteArticle(req: Request, res: Response): Promise<Response>;
  likeArticle(req: Request, res: Response): Promise<Response>;
  dislikeArticle(req: Request, res: Response): Promise<Response>;
  fetchBlockedArticles(req: Request, res: Response): Promise<Response>;
  unblockArticle(req: Request, res: Response): Promise<Response>;
  blockArticle(req: Request, res: Response): Promise<Response>;
}