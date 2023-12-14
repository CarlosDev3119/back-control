import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { RegisterUserRepository } from "../../domain/repositories/registerUsers/registerUserRepository";
import { GetAllRegisterUsers } from "../../domain/use-cases/registerUsers/getAllUsers.use-case";
import { GetRegisterUser } from "../../domain/use-cases/registerUsers/getUserById.use-case";
import { CreateRegisterUser } from "../../domain/use-cases/registerUsers/createRegisterUser.use-case";
import { RegisterDto } from "../../domain/dtos/registers/registerUser.dto";


export class RegisterUserController {

    constructor(
        private readonly registerUserRepository: RegisterUserRepository
     ){}

     private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getAllRegisterUsers = (req: Request, res: Response) => {

        new GetAllRegisterUsers(this.registerUserRepository).execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))
       
    }

    getRegisterUserById = (req: Request, res: Response) => {
        const {id} = req.query;

        new GetRegisterUser(this.registerUserRepository).execute(req.body.user.id_user, +id!)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))
    }

    createRegisterUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterDto.create({id_user: req.body.user.id_user, ...req.body})
        if(error) return res.status(400).json({ error });

        new CreateRegisterUser(this.registerUserRepository).execute(registerUserDto!)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }
 

}