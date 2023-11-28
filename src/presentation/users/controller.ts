import { Request, Response } from "express";
import { CreateUser, CustomError, GetUser, GetUsers, RegisterUserDto, UpdateUser, UserRepository } from "../../domain";
import { UpdatedUserDto } from "../../domain/dtos/users/updated-user.dto";



export class UserController {

    constructor(

       private readonly userRepository: UserRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getAllUsers = (req: Request, res: Response) => {
        
        new GetUsers( this.userRepository ).execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));

    }

    getUserById = (req: Request, res: Response) => {
        
        const id_user = +req.params.id;
        
        if( !id_user || isNaN(+id_user)) return res.status(400).json({error: 'ID is not valid - the id must be a number'});

        new GetUser( this.userRepository ).execute( id_user )
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));
    }

    createUser = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({ error });

        new CreateUser( this.userRepository )
            .execute( registerUserDto! )
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));
            
    }

    updatedUser = (req: Request, res: Response) => {

        const id = Number(req.params.id);

        const [error, updateUserDto] = UpdatedUserDto.create({id_user: id, ...req.body});
        if(error) return res.status(400).json({ error });
        

        new UpdateUser( this.userRepository )
            .execute( updateUserDto! )
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));
      
            
    }



}

