import { CustomError } from "../errors/custom.errors";



export class PeriodEntity {
    constructor(
        public id_period: number,
        public readonly period_name: string,

    
    ){}

    static fromObject(object: { [key:string]: any }){

        const {id_period, period_name} = object;

        if(!id_period) throw CustomError.badRequest('Missing id_period');
        if(!period_name) throw CustomError.badRequest('Missing period_name');
          
        return new PeriodEntity(id_period, period_name);

    }
}


