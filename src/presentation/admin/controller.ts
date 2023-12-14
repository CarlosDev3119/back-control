import { Request, Response } from "express";
import {  CustomError} from "../../domain";
import { prisma } from "../../data/mysql/config";

import path from 'path';
import fs from 'fs';
import mime from 'mime';

export class AdminController {

    constructor(
    ){}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: 'Internal Server Error'});
    }

    getRegisterTypes = async (req: Request, res: Response) => {
        
        try{

            const data: { [key: string]: any} = await prisma.$queryRaw`
                    select * from registertypes;
                `;

            res.json(data);
        }catch(error){
            this.handleError(error, res)
        }

    }

    getDataUsers = async (req: Request, res: Response) => {
        try{
            const {id} = req.query;

            const data: { [key: string]: any} = await prisma.$queryRaw`
                    select  u.id_user,u.register_number from registerUser as reguser 
                    INNER JOIN 
                        users as u ON u.id_user = reguser.id_user
                    where 
                        reguser.id_register_type = ${id}
                `;

            res.json(data);
        }catch(error){
            this.handleError(error, res)
        }
    }

    getAllDataByUser = async (req: Request, res: Response) => {
        try{
            

            const data: { [key: string]: any} = await prisma.$queryRaw`
                    SELECT 
                    u.id_user, CONCAT(u.name_user, ' ', u.last_name, ' ', u.middle_name)as name_user, rt.register_type,
                    dt.document_type, d.path_document, d.document_status, userdoc.id_user_document, d.id_document
                    FROM 
                        userDocuments as userdoc
                    INNER JOIN 
                        registerUser as registu ON registu.id_user = userdoc.id_user
                    INNER JOIN 
                        users as u ON u.id_user = registu.id_user
                    INNER JOIN 
                        documents as d ON d.id_document = userdoc.id_document
                    INNER JOIN 
                        documentTypes as dt ON dt.id_document_type = d.id_document_type
                    INNER JOIN 
                        registerTypes as rt ON rt.id_register_type = userdoc.id_register_type
                    WHERE userdoc.id_user = ${req.body.id_user};
                `;

            res.json(data);
        }catch(error){
            this.handleError(error, res)
        }
    }

    updateDocumentUser = async (req: Request, res: Response) => {
        try{
            

            const data: { [key: string]: any} = await prisma.$queryRaw`
                    UPDATE documents
                    SET document_status = 'approved'
                    WHERE id_document = ${req.body.id_document};
                `;

            res.json(data);
        }catch(error){
            this.handleError(error, res)
        }
    }


    getDocument = async (req: Request, res: Response) => {

        const {path: ruta} = req.query;
        const docPath = path.resolve(__dirname, `../../../${ruta}`);
        if( !fs.existsSync(docPath)){
            return res.status(404).json('File not found');
        }
        const contentType = mime.lookup(docPath);

        // Configura el tipo de contenido en la respuesta
        res.setHeader('Content-Type', contentType);

        // Envía el archivo al cliente
        res.sendFile(docPath);
        
        // res.sendFile(docPath);

    }

    setRegisterUser = async (req: Request, res: Response) => {
        const data: { [key: string]: any} = await prisma.$queryRaw`
             SELECT * FROM userDocuments as ud
                INNER JOIN 
                    documents as d ON d.id_document = ud.id_document
                where ud.id_user = ${req.body.id_user} and document_status = 'pending';
            `;

          res.json(data)
    }


    

}

