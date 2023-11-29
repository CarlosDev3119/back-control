import { DegreeEntity } from "../../entities/degree.entity";
import { DegreeRepository } from "../../repositories/degrees/degree.repository";



interface DegreeUseCase {

    execute(): Promise<DegreeEntity[]>
}

export class GetDegree implements DegreeUseCase {

    constructor(
        private readonly degreeRepository: DegreeRepository
    ){}

    execute(): Promise<DegreeEntity[]> {
        return this.degreeRepository.getAllDegrees()
    }

}