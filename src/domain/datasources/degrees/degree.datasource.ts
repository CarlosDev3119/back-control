import { DegreeEntity } from "../../entities/degree.entity";


export abstract class DegreeDatasource {

    abstract getAllDegrees(): Promise<DegreeEntity[]>

}