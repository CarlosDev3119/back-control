import { CustomError } from "../errors/custom.errors";



export class SemesterEntity {
    constructor(
        public id_semester: number,
        public readonly semester_name: string,

    
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_semester, semester_name} = object;

        if(!id_semester) throw CustomError.badRequest('Missing id_semester');
        if(!semester_name) throw CustomError.badRequest('Missing semester_name');
          
        return new SemesterEntity(id_semester, semester_name);

    }
}


