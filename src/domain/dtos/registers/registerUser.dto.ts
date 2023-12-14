
export class RegisterDto {


    constructor(
        public readonly id_register_type: number,
        public readonly id_user: number,
        public readonly id_semester: number,
        public readonly id_period: number,
    ){}

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {

        const { 
            id_register_type,
            id_user,
            id_semester,
            id_period,
            
        } = object;
        
        if(!id_register_type)return ['Missing id_register_type'];
        if(!id_user)return ['Missing id_user'];
        if(!id_semester)return ['Missing id_semester'];
        if(!id_period)return ['Missing id_period'];


        
        return [undefined, new RegisterDto(id_register_type, id_user, id_semester, id_period)];

    }

        
}




