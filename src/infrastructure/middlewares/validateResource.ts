import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

export const validateResource =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    next();
  };
