import { Request, Response } from "express";
import { CustomError, DocumentTypeRepository } from "../../domain";
import { GetAllDocuments } from "../../domain/use-cases/documentTypes/getAll.use-case";
import { GetInscriptionDocuments } from "../../domain/use-cases/documentTypes/getInscription.use-case";
import { GetReinscriptionDocuments } from "../../domain/use-cases/documentTypes/getReinscription.use-case";




export class DocumentTypeController {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getDocuments = (req: Request, res: Response) => {
        
        new GetAllDocuments(this.documentTypeRepository).execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }

    getDocumentReinscription = (req: Request, res: Response) => {
        
        new GetReinscriptionDocuments(this.documentTypeRepository).execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }

    getDocumentInscription = (req: Request, res: Response) => {
        
        new GetInscriptionDocuments(this.documentTypeRepository).execute()
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res))

    }

}

