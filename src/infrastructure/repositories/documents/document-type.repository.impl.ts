import { DocumentEntity, DocumentTypeRepository } from "../../../domain";



export class DocumentTypeRepositoryImpl implements DocumentTypeRepository {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ){}


    getAllByInscription(): Promise<DocumentEntity[]> {
        return this.documentTypeRepository.getAllByInscription();
    }
    getAllByReinscription(): Promise<DocumentEntity[]> {
        return this.documentTypeRepository.getAllByReinscription();
    }

    getAll(): Promise<DocumentEntity[]> {
        return this.documentTypeRepository.getAll();
    }

}