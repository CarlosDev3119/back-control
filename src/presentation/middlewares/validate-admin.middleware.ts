import { NextFunction, Request, Response } from "express";
import { prisma } from "../../data/mysql/config";
import { ResponseErrors } from "../../domain";

export enum StatusRole {
    admin = 'ADMIN_ROLE',
    user = 'USER_ROLE'
}


export class ValidateAdminRoleMiddleware {


    static async validateAdminRole(req: Request, res: Response, next: NextFunction){

        const user = req.body.user;
        
        if(user.role !== StatusRole.admin ) return ResponseErrors.badRequest('Access denied ', res);

        next();

    }

}