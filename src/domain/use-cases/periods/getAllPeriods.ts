import { PeriodEntity } from "../../entities/period.entity";
import { PeriodRepository } from "../../repositories/periods/period.repository";


interface PeriodUseCase {
    execute(): Promise<PeriodEntity[]>
}

export class GetAllPeriods implements PeriodUseCase {

    constructor(
        private readonly periodRepository: PeriodRepository
    ){}
    
    execute(): Promise<PeriodEntity[]> {
        return this.periodRepository.getAllPeriods();
    }

}