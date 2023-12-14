import { PeriodEntity } from "../../entities/period.entity";


export abstract class PeriodRepository {
    
    abstract getAllPeriods(): Promise<PeriodEntity[]>

}