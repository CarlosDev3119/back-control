import { DocumentUserDatasource, DocumentUserDto, DocumentUserRepository } from "../../../domain";
import { DocumentUserEntity } from "../../../domain/entities/document.user.entity";


export class DocumentUserRepositoryImpl implements DocumentUserRepository {

    constructor(
        private readonly documentUserDatasource: DocumentUserDatasource
    ){}


    create(documentUserDto: DocumentUserDto): Promise<DocumentUserEntity> {
        return this.documentUserDatasource.create(documentUserDto);
    }

}