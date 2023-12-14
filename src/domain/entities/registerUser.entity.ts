

import { CustomError } from "../errors/custom.errors";



export class RegisterUserEntity {

    constructor(
        public id_register_user: number,
        public id_register_type: number,
        public id_user: number, 
        public id_semester: number,
        public id_period: number,
        public date_register: Date|null    
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_register_user, id_register_type, id_user, id_semester, id_period, date_register} = object;

        if(!id_register_user) throw CustomError.badRequest('Missing id_register_user');
        if(!id_register_type) throw CustomError.badRequest('Missing id_register_type');
        if(!id_user) throw CustomError.badRequest('Missing id_user');
        if(!id_semester) throw CustomError.badRequest('Missing id_semester');
        if(!id_period) throw CustomError.badRequest('Missing id_period');
        // if(!date_register) throw CustomError.badRequest('Missing date_register');
          
        return new RegisterUserEntity(id_register_user, id_register_type, id_user, id_semester, id_period, date_register);

    }
}


