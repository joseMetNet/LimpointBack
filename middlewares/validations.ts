import { validationResult } from "express-validator";
import { Response, Request } from 'express';

export const validateFields = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};