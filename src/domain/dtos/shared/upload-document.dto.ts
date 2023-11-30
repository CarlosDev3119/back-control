

enum StatusDocument {
    pending = 'pending',
    approved = 'approved',
    denied = 'denied',
}


export class UploadDocumentDto {

    private constructor(
        public readonly id_user: number,
        public readonly id_register_type: number,
        public readonly id_document_type: number,
        public readonly document_status: StatusDocument = StatusDocument.pending,
    ){}

    static create(object: { [key: string]: any }): [ string?, UploadDocumentDto?]{

        const {document_name, path_document, id_document_type } = object;

        // if( isNaN(page) || isNaN(limit)  ) return ['Page and limit must be numbers'];
        // if(page <= 0 ) return ['Page must be greater than 0'];
        // if(limit <= 0 ) return ['Limit must be greater than 0'];

        return [undefined, new UploadDocumentDto(document_name, path_document, id_document_type) ];

    }

}



