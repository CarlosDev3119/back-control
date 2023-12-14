

import { DocumentEntity } from "../../entities/document.entity";


export abstract class DocumentTypeRepository {

    abstract getAll(): Promise<DocumentEntity[]>

    abstract getAllByInscription(): Promise<DocumentEntity[]> 

    abstract getAllByReinscription(): Promise<DocumentEntity[]> 

}