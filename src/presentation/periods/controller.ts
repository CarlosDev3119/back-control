import { Request, Response } from "express";
import { CustomError, PeriodRepository } from "../../domain";
import { GetAllPeriods } from "../../domain/use-cases/periods/getAllPeriods";


export class PeriodController {

    constructor(
        private readonly periodRepository: PeriodRepository
     ){}

     private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getAllPeriods = (req: Request, res: Response) => {

        new GetAllPeriods(this.periodRepository)
            .execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))
        
    }
 

}