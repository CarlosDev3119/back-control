import { DocumentUserDto } from "../../dtos/documents/document.user.dto";
import { DocumentUserEntity } from "../../entities/document.user.entity";


export abstract class DocumentUserRepository {

    abstract create(documentUserDto: DocumentUserDto): Promise<DocumentUserEntity>;

}