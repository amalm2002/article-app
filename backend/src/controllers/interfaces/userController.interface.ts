import { Request, Response } from "express";

export interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>;
  updateUser(req: Request, res: Response): Promise<Response>;
  changePassword(req: Request, res: Response): Promise<Response>;
  updatePreference(req: Request, res: Response): Promise<Response>;
}