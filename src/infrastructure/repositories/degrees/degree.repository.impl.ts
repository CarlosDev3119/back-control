import { DegreeDatasource, DegreeEntity, DegreeRepository } from "../../../domain";


export class DegreeRepositoryImpl implements DegreeRepository {

    constructor(
        private readonly degreeDatasource: DegreeDatasource
    ){}

    getAllDegrees(): Promise<DegreeEntity[]> {
        return this.degreeDatasource.getAllDegrees()
    }


}