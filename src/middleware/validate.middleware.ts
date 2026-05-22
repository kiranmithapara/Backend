import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  //aa paramitter ni andar zod schema j pass thay sake
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); //req.body mathi jem schema define karel hoy tem na ave to error avse

      next();
    } catch (error: any) {
    //   console.log(error.issues);
      return res.status(400).json({
        success: false,
        message: error.issues[0].message, //schema na error ne access karva .issues no use thay
      });
    }
  };
};
