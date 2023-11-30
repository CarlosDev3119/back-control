import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/mysql/config";
import { ResponseErrors } from "../../domain";


export class ValidateUserMiddleware {


    static async validateRegisterNumber(req: Request, res: Response, next: NextFunction){

        const registerNumber = req.body.register_number;

        if(!registerNumber) return ResponseErrors.badRequest('Register Number is required', res);

        const user = await prisma.users.findFirst({
            where: { register_number: registerNumber}
        });
        
        if(user) return ResponseErrors.badRequest('Register Number already in use', res);

        next();

    }

}