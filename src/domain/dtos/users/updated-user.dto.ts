import { regularExps } from "../../../config";

export enum Roles {
    low = 'USER_ROLE',
    high = 'ADMIN_ROLE',
}


export class UpdatedUserDto {

    constructor(
        public readonly id_user: number,
        public readonly name_user?: string,
        public readonly last_name?: string,
        public readonly middle_name?: string,
        public readonly email?: string,
        public readonly password?: string
    ){}

    get values(){
        const returnObj: {[key:string]: any} = {};

        if( this.name_user ) returnObj.name_user = this.name_user;
        if( this.last_name ) returnObj.last_name = this.last_name;
        if( this.middle_name ) returnObj.middle_name = this.middle_name;
        if( this.email ) returnObj.email = this.email;
        if( this.password ) returnObj.password = this.password;

        return returnObj;
    }

    static create(object: { [key: string]: any }): [string?, UpdatedUserDto?] {

        const { name_user, last_name, middle_name, email, password, id_user} = object;
        
        if(!id_user || isNaN(id_user)) return ['id user must be a number'];


        return [undefined, new UpdatedUserDto( id_user, name_user, last_name, middle_name, email, password )];

    }

        
}




