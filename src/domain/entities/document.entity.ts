import { CustomError } from "../errors/custom.errors";


export class DocumentEntity {

    constructor(
        public readonly id_document_type: number,
        public readonly document_type: string
    ){}

    static fromObject( object:{ [key: string]: any} ){

        const { id_document_type, document_type } = object;
        

        if(!id_document_type || isNaN(+id_document_type)) throw CustomError.badRequest('Missing id document type');
        if(!document_type) throw CustomError.badRequest('Missing document type');

        return new DocumentEntity(id_document_type, document_type);

    }


}