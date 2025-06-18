import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T extends object>(type: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoObj = plainToInstance(type, req.body);
    const errors = await validate(dtoObj);
    if (errors.length > 0) {
      res.status(400).json({
        message: 'Error de validación',
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }
    next();
  };
}
