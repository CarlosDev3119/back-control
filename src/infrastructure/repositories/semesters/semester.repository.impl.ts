import { SemesterDatasource, SemesterEntity, SemesterRepository } from "../../../domain";



export class SemesterRepositoryImpl implements SemesterRepository{

    constructor(
        private readonly semesterDatasource: SemesterDatasource
    ){}

        
    getAllSemesters(): Promise<SemesterEntity[]> {
        return this.semesterDatasource.getAllSemesters()
    }


}