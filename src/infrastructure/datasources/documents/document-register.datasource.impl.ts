import { prisma } from "../../../data/mysql/config";
import { CustomError, DocumentDto, DocumentRegisterDatasource, DocumentRegisterEntity, DocumentUserDto, RegisterUserDto } from "../../../domain";


export class DocumentRegisterDatasourceImpl implements DocumentRegisterDatasource {

    
    async create(documentRegisterDto: DocumentDto): Promise<DocumentRegisterEntity> {
        
        try{

            const {id_user, email_user,id_register_type, ...restRegisterDto } = documentRegisterDto;

            const nameDocument = await prisma.documentTypes.findFirst({
                where :{
                    id_document_type: restRegisterDto.id_document_type
                }
            });

            const documents = await prisma.documents.create({
                data: {document_name: nameDocument?.document_type ,...restRegisterDto}
            });

            const {id_document} = documents;
            const dataRegisterType = {
                id_user: id_user,
                id_document: id_document,
                id_register_type: id_register_type
            }
            
            
            const [error, documentUserDto] = DocumentUserDto.create(dataRegisterType)
           

            const data = await prisma.userDocuments.create({
                data: documentUserDto
            });


            const userDocumentsInfo:{ [key: string]: any} = await prisma.$queryRaw`
                SELECT
                    ud.id_user,
                    ud.id_user_document,
                    ud.id_document,
                    us.name_user,
                    doc.path_document,
                    doc.document_name,
                    doc.document_status,
                    ud.date_register,
                    ud.date_approval,
                    rt.register_type
                FROM
                    userDocuments AS ud
                    INNER JOIN documents AS doc ON doc.id_document = ud.id_document
                    INNER JOIN registerTypes AS rt ON rt.id_register_type = ud.id_register_type
                    INNER JOIN users AS us ON us.id_user = ud.id_user
                WHERE
                    ud.id_user = ${id_user} and
                    ud.id_user_document = ${data.id_user_document};
                `;


            return DocumentRegisterEntity.fromObject(userDocumentsInfo[0])
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }

    }

    

}