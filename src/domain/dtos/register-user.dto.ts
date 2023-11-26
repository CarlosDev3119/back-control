import { regularExps } from "../../config/regular-exp";

export enum Roles {
    low = 'USER_ROLE',
    high = 'ADMIN_ROLE',
}


export class RegisterUserDto {


    constructor(
        public readonly name_user: string,
        public readonly last_name: string,
        public readonly middle_name: string,
        public readonly email: string,
        public password: string,
        public readonly register_number: string,
        public readonly id_degree: number,
        public readonly role: Roles = Roles.low,

    ){}

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {

        const { name_user, last_name, middle_name, email, register_number, password, id_degree, role = Roles.low} = object;

        if(!name_user)return ['Missing name user'];
        if(!last_name)return ['Missing last name'];
        if(!middle_name)return ['Missing middle name'];
        if(!email)return ['Missing email'];
        if(!regularExps.email.test(email)) return ['Email is not valid'];

        if(!register_number)return ['Missing register number'];
        if( register_number.length < 9 )return ['Register number must be at least 9 characters'];

        if(!password)return ['Password is not valid'];
        if( password.length < 5 )return ['Password must be at least 5 characters'];

        if(!id_degree) return ['Missing id degree'];
        if(isNaN(id_degree)) return ['id degree must be a number'];
        
        if(!role) return ['Missing role'];

        return [undefined, new RegisterUserDto(name_user, last_name, middle_name, email, password, register_number, +id_degree, role)];

    }

        
}




