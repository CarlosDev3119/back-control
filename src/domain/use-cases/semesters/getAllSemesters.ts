import { SemesterEntity } from "../../entities/semester.entity";
import { SemesterRepository } from "../../repositories/semesters/semester.repository";


interface SemesterUseCase {
    execute(): Promise<SemesterEntity[]>
}

export class GetAllSemesters implements SemesterUseCase {

    constructor(
        private readonly semesterRepository: SemesterRepository
    ){}
    
    execute(): Promise<SemesterEntity[]> {
        return this.semesterRepository.getAllSemesters();
    }

}