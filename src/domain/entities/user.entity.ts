import { CustomError } from "../errors/custom.errors";

export enum Status {
    active = 'active',
    inactive = 'inactive'
}


export class UserEntity {


    constructor(
        public id_user: number,
        public readonly name_user: string,
        public readonly last_name: string,
        public readonly middle_name: string,
        public readonly email: string,
        public readonly register_number: string,
        public readonly degree: string,
        public readonly role: Status,
    
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_user, name_user, last_name, middle_name, email, register_number, degree, role} = object;

        if(!id_user) throw CustomError.badRequest('Missing id_user');
        if(!name_user) throw CustomError.badRequest('Missing name_user');
        if(!last_name) throw CustomError.badRequest('Missing last_name');
        if(!middle_name) throw CustomError.badRequest('Missing middle_name');
        if(!email) throw CustomError.badRequest('Missing email');
        if(!register_number) throw CustomError.badRequest('Missing register_number');
        if(!degree) throw CustomError.badRequest('Missing id_degree');
        if(!role) throw CustomError.badRequest('Missing role');     

        return new UserEntity(id_user, name_user, last_name, middle_name, email, register_number, degree, role);

    }

}

