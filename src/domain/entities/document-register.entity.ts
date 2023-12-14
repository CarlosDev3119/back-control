import { CustomError } from "../errors/custom.errors";

enum DocumentStatus {
    pending = 'pending',
    approved = 'approved',
    denied = 'denied',
}

export class DocumentRegisterEntity {

    constructor(
        public id_document: number,
        public id_user: number,
        public id_user_document: number,
        public name_user: string,
        public document_name: string,
        public path_document: string,
        public document_status: DocumentStatus = DocumentStatus.pending,
        public date_register: Date,
        public date_approval: Date | null,
        public register_type: string
    ){}

    static fromObject(object: {[key: string]: any}){

        const {id_document, id_user, id_user_document, name_user, document_name, path_document, document_status, date_register, date_approval, register_type} = object;
        
        if (!id_document) throw CustomError.badRequest('Missing id_document');
        if (!id_user) throw CustomError.badRequest('Missing id_user');
        if (!id_user_document) throw CustomError.badRequest('Missing id_user_document');
        if (!name_user) throw CustomError.badRequest('Missing name_user');
        if (!document_name) throw CustomError.badRequest('Missing document_name');
        if (!path_document) throw CustomError.badRequest('Missing path_document');
        if (!date_register) throw CustomError.badRequest('Missing date_register');
        // Validar otros campos según sea necesario

        return new DocumentRegisterEntity(
            id_document,
            id_user,
            id_user_document,
            name_user,
            document_name,
            path_document,
            document_status,
            date_register,
            date_approval,
            register_type
        );
    }
}
