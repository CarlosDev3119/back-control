import { PeriodEntity } from "../../entities/period.entity";


export abstract class PeriodDatasource {
    
    abstract getAllPeriods(): Promise<PeriodEntity[]>

}