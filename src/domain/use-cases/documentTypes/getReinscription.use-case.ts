import { DocumentEntity } from "../../entities/document.entity";
import { DocumentTypeRepository } from "../../repositories/documents/document-type.repository";



interface GetDocumentUseCase {

    execute(): Promise<DocumentEntity[]>
}

export class GetReinscriptionDocuments implements GetDocumentUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ){}

    execute(): Promise<DocumentEntity[]> {
        return this.documentTypeRepository.getAllByReinscription();
    }

}