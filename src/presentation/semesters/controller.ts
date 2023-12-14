import { Request, Response } from "express";
import { CustomError, SemesterRepository } from "../../domain";
import { GetAllSemesters } from "../../domain/use-cases/semesters/getAllSemesters";


export class SemesterController {

    constructor(
        private readonly semesterRepository: SemesterRepository
     ){}

     private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getAllsemesters = (req: Request, res: Response) => {

        new GetAllSemesters(this.semesterRepository)
            .execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))
        
    }
 

}