import { prisma } from "../../../data/mysql/config";
import { CustomError, RegisterUserDto } from "../../../domain";
import { RegisterUserDatasource } from "../../../domain/datasources/registerUsers/registerUser.datasource";
import { RegisterDto } from "../../../domain/dtos/registers/registerUser.dto";
import { RegisterUserEntity } from "../../../domain/entities/registerUser.entity";




export class RegisterUserDatasourceImpl implements RegisterUserDatasource {

    async getUserById(userId: number, id_register_type: number): Promise<RegisterUserEntity> {
        try{

            const register = await prisma.registerUser.findFirst({
                where: {
                    id_user: userId,
                    id_register_type: id_register_type
                }
            });

            if(!register) throw CustomError.badRequest('An error occurred while getting user');
      
            return RegisterUserEntity.fromObject(register);
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getUsers(): Promise<RegisterUserEntity[]> {

        try{

            const registers = await prisma.registerUser.findMany()
            console.log(registers)
      
            return registers.map( register => RegisterUserEntity.fromObject(register) );
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
        
    }

    async createRegister(registerUserDto: RegisterDto): Promise<RegisterUserEntity> {
        try{

            const register = await prisma.registerUser.create({
                data: registerUserDto!
            })
      
            return RegisterUserEntity.fromObject(register);
            
        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

}
