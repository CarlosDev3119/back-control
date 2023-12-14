import { prisma } from "../../../data/mysql/config";
import { CustomError, DocumentUserDatasource, DocumentUserDto } from "../../../domain";
import { DocumentUserEntity } from "../../../domain/entities/document.user.entity";
import { DocumentUserMapper } from "../../mappers/document-user.mapper";



export class DocumentUserDatasourceImpl implements DocumentUserDatasource {



    async create(documentUserDto: DocumentUserDto): Promise<DocumentUserEntity> {
        try{

            console.log(documentUserDto)
            const documents = await prisma.userDocuments.create({
                data: documentUserDto
            });

            console.log(documents);


            return DocumentUserMapper.FromObject(documents);
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }



}