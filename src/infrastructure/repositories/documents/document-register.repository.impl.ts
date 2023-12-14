import { prisma } from "../../../data/mysql/config";
import { CustomError, DocumentDto, DocumentEntity, DocumentRegisterEntity, DocumentRegisterRepository } from "../../../domain";


export class DocumentRegisterRepositoryImpl implements DocumentRegisterRepository {

    constructor(
        private readonly documentRegisterDatasource: DocumentRegisterRepository
    ){}

    async create(documentRegisterDto: DocumentDto): Promise<DocumentRegisterEntity> {
        return this.documentRegisterDatasource.create(documentRegisterDto);
    }

}