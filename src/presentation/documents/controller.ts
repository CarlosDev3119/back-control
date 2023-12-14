


import { Request, Response } from "express";
import { CustomError, DocumentDto, DocumentEntity, DocumentRegisterRepository, DocumentUserDto } from "../../domain";
import { RegisterDocumentUseCase } from "../../domain/use-cases/documents/document-register.use-case";
import { UploadedFile } from "express-fileupload";
import { prisma } from "../../data/mysql/config";



export class DocumentUserController {

    constructor(
        private readonly documentRegisterRepository: DocumentRegisterRepository
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    createRegisterDocument = (req: Request, res: Response) => {
        
        const [error, documentRegisterDto] = DocumentDto.create({id_user: req.body.user.id_user, email_user:req.body.user.email, ...req.body});
        if(error) return res.status(400).json({ error });
        
        const file = req.body.files.at(0) as UploadedFile;
        
        
        new RegisterDocumentUseCase(file, this.documentRegisterRepository)
            .execute(documentRegisterDto!)
            .then( data => res.json(data))
            .catch( error => this.handleError(error, res));
        
    }


    getDocuments = async (req: Request, res: Response) => {
        try{

            const data: { [key: string]: any} = await prisma.$queryRaw`
               SELECT
                    dt.id_document_type,
                    d.document_status
                FROM
                    documentTypes dt
                LEFT JOIN
                    documents d ON dt.id_document_type = d.id_document_type
                LEFT JOIN
                    userDocuments ud ON d.id_document = ud.id_document
                WHERE
                    ud.id_user = ${req.body.user.id_user} 
                AND 
                    ud.id_register_type = 1
                
                ;
                `;

            res.json(data);
        }catch(error){
            this.handleError(error, res)
        }

    }

    getDocumentsReins = async (req: Request, res: Response) => {
        try{

            const data: { [key: string]: any} = await prisma.$queryRaw`
               SELECT
                    dt.id_document_type,
                    d.document_status
                FROM
                    documentTypes dt
                LEFT JOIN
                    documents d ON dt.id_document_type = d.id_document_type
                LEFT JOIN
                    userDocuments ud ON d.id_document = ud.id_document
                WHERE
                    ud.id_user = ${req.body.user.id_user} 
                AND 
                    ud.id_register_type = 2
                
                ;
                `;

            res.json(data);
        }catch(error){
            this.handleError(error, res)
        }

    }

   

}

