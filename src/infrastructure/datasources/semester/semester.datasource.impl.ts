import { prisma } from "../../../data/mysql/config";
import { CustomError, SemesterDatasource, SemesterEntity } from "../../../domain";


export class SemesterDatasourceImpl implements SemesterDatasource{

    async getAllSemesters(): Promise<SemesterEntity[]> {
        try{

            const semesters = await prisma.semesters.findMany()
      
            return semesters.map(semester => SemesterEntity.fromObject(semester));
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }

    }

}