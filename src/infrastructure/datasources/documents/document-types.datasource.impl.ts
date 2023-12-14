import { prisma } from "../../../data/mysql/config";
import { CustomError, DocumentEntity, DocumentTypeDatasource } from "../../../domain";


export class DocumentTypeDatasourceImpl implements DocumentTypeDatasource {


  
    async getAll(): Promise<DocumentEntity[]> {
        try{

            const documents = await prisma.documentTypes.findMany();

            return documents.map( document => DocumentEntity.fromObject(document))
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getAllByInscription(): Promise<DocumentEntity[]> {
        try{

            const documents = await prisma.documentTypes.findMany({
                where: {
                    id_document_type: {
                      gte: 1, // Mayor o igual que 1
                      lte: 13, // Menor o igual que 10
                    },
                  },
            });

            return documents.map( document => DocumentEntity.fromObject(document))
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getAllByReinscription(): Promise<DocumentEntity[]> {
        try{
            const idsToRetrieve = [4, 14, 1, 3, 15, 17, 18];
            const documents = await prisma.documentTypes.findMany({
                where: {
                    id_document_type: {
                      in: idsToRetrieve
                    },
                  },
            });

            return documents.map( document => DocumentEntity.fromObject(document))
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    

}