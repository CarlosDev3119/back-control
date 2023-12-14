import { CustomError } from "../errors/custom.errors";


export class DocumentUserEntity {

    constructor(
        public readonly id_user_document: number,
        public readonly id_user: number,
        public readonly id_document: number,
        public readonly id_register_type: number,
        public readonly date_approval: Date | null,
        public readonly date_register: Date
    ){}

    static fromObject( object:{ [key: string]: any} ){

        const { id_user_document, id_user, id_document, id_register_type, date_approval, date_register } = object;
        
        if(!id_user_document || isNaN(id_user_document)) throw CustomError.badRequest( 'Missing id_user_document' );
        if(!id_user || isNaN(id_user)) throw CustomError.badRequest( 'Missing id_user' );
        if(!id_document || isNaN(id_document)) throw CustomError.badRequest( 'Missing id_document' );
        if(!id_register_type || isNaN(id_register_type)) throw CustomError.badRequest( 'Missing id_register_type' );
        if(!date_register) throw CustomError.badRequest( 'Missing date_register' );
        if(date_approval === 'undefined') throw CustomError.badRequest( 'Missing date_approval')

        return new DocumentUserEntity( id_user_document, id_user, id_document, id_register_type, date_approval, date_register);
    }


}