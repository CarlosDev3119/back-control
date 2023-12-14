import { SemesterEntity } from "../../entities/semester.entity";


export abstract class SemesterRepository {
    
    abstract getAllSemesters(): Promise<SemesterEntity[]>

}