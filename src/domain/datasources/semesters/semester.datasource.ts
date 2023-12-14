import { SemesterEntity } from "../../entities/semester.entity";


export abstract class SemesterDatasource {
    
    abstract getAllSemesters(): Promise<SemesterEntity[]>

}