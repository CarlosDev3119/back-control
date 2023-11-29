import { prisma } from "../../../data/mysql/config";
import { CustomError, DegreeDatasource, DegreeEntity } from "../../../domain";


export class DegreeDatasourceImpl implements DegreeDatasource {

    async getAllDegrees(): Promise<DegreeEntity[]> {
        try{

            const degrees = await prisma.degrees.findMany();

            return degrees.map( degree => DegreeEntity.fromObject(degree))
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    
}