import { prisma } from "../../../data/mysql/config";
import { CustomError, PeriodDatasource, PeriodEntity, SemesterEntity } from "../../../domain";


export class PeriodDatasourceImpl implements PeriodDatasource{

    async getAllPeriods(): Promise<PeriodEntity[]> {
        try{

            const periods = await prisma.periods.findMany()
      
            return periods.map( period => PeriodEntity.fromObject(period) );
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }


}