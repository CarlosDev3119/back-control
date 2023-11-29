import { Request, Response } from "express";
import { CustomError, DegreeRepository, GetDegree } from "../../domain";


export class DegreeController {

    constructor(
        private readonly degreeRepository: DegreeRepository
     ){}

     private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getDegrees = (req: Request, res: Response) => {

        new GetDegree( this.degreeRepository )
            .execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))
        
    }
 

}