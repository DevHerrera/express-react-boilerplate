import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validatePayload = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: 'Invalid payload', error: error.message });
    }
    next();
  };
};
