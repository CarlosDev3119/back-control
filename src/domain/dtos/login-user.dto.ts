import { regularExps } from "../../config/regular-exp";

export class LoginUserDto {


    constructor(
        public readonly email: string,
        public readonly password: string
    ){}

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = object;
        if(!email)return ['Missing email'];
        if(!regularExps.email.test(email)) return ['Email is not valid'];
        if(!password)return ['Password is not valid'];
        if( password.length < 5 )return ['Password must be at least 5 characters'];

        return [undefined, new LoginUserDto(email, password)];

    }

        
}




