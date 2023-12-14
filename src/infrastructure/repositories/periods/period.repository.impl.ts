import { PeriodDatasource, PeriodRepository, PeriodEntity } from "../../../domain";



export class PeriodRepositoryImpl implements PeriodRepository{

    constructor(
        private readonly periodDatasource: PeriodDatasource
    ){}
    getAllPeriods(): Promise<PeriodEntity[]> {
        return this.periodDatasource.getAllPeriods()
    }







}