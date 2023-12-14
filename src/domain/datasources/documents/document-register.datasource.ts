import { DocumentDto } from "../../dtos/documents/document.dto";
import { DocumentRegisterEntity } from "../../entities/document-register.entity";



export abstract class DocumentRegisterDatasource {

    abstract create(documentRegisterDto: DocumentDto): Promise<DocumentRegisterEntity>;

}