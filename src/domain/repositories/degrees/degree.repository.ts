import { DegreeEntity } from "../../entities/degree.entity";


export abstract class DegreeRepository {

    abstract getAllDegrees(): Promise<DegreeEntity[]>

}