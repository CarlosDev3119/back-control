
enum DocumentStatus {
    pending = 'pending',
    approved = 'approved',
    denied = 'denied',
}


export class DocumentDto {

    constructor(
        public readonly id_user: number,
        public email_user: number,
        public id_document_type: number,
        public document_status: DocumentStatus = DocumentStatus.pending,
        public id_register_type: number,
        public path_document?: string,
    ){}

    static create( object: {[key: string]: any}): [string?, DocumentDto?]{

        const {id_user, path_document: pathDocument, id_document_type, document_status, email_user, id_register_type} = object;
        let path_document = pathDocument;

        if(!id_user)return ['Missing id_user'];
        if(!email_user)return ['Missing email_user'];

        if(email_user){
            path_document = `uploads/${email_user}` ;
        }
        
        if(!path_document)return ['Missing path_document'];
        if(!id_document_type)return ['Missing id_document_type'];
        if(!id_register_type)return ['Missing id_register_type'];
        

        return [undefined, new DocumentDto(id_user, email_user, +id_document_type, document_status, id_register_type, path_document)];

    }

}