import { CustomError } from "../errors/custom.errors";


export class DegreeEntity {


    constructor(
        public id_degree: number,
        public readonly degree: string,

    
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_degree, degree} = object;

        if(!id_degree) throw CustomError.badRequest('Missing id_degree');
        if(!degree) throw CustomError.badRequest('Missing degree_ame');
          
        return new DegreeEntity(id_degree, degree);

    }

}

