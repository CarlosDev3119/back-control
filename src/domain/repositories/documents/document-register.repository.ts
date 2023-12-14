import { DocumentDto } from "../../dtos/documents/document.dto";
import { DocumentRegisterEntity } from "../../entities/document-register.entity";



export abstract class DocumentRegisterRepository {

    abstract create(documentRegisterDto: DocumentDto): Promise<DocumentRegisterEntity>;

}