import { DateAdapter } from "../../../config/date.adapter";


export class DocumentUserDto {

    constructor(
        public id_user: number,
        public id_document: number,
        public id_register_type: number,
        public date_approval?:  string,
        public date_register?:  Date,
    ){}

    static create( object: {[key: string]: any}): [string?, DocumentUserDto?]{

        const {id_user, id_document, id_register_type, date_approval = null } = object;
        
        if(!id_user)return ['Missing id user'];
        if(!id_document)return ['Missing id document'];
        if(!id_register_type)return ['Missing id register type'];

        let date_register = new Date();

        return [undefined, new DocumentUserDto(id_user, id_document, +id_register_type, date_approval, date_register)];

    }

}