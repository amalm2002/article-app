import { Request, Response } from "express";

export interface IUserController {
  getUser(req: Request, res: Response): Promise<any>;
  updateUser(req: Request, res: Response): Promise<any>;
  changePassword(req: Request, res: Response): Promise<any>;
  updatePreference(req: Request, res: Response): Promise<any>;
}