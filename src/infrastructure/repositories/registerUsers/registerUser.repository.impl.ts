import { RegisterUserDatasource } from "../../../domain/datasources/registerUsers/registerUser.datasource";
import { RegisterDto } from "../../../domain/dtos/registers/registerUser.dto";
import { RegisterUserEntity } from "../../../domain/entities/registerUser.entity";
import { RegisterUserRepository } from "../../../domain/repositories/registerUsers/registerUserRepository";


export class RegisterUserRepositoryImpl implements RegisterUserRepository{

    constructor(
        private readonly registerUserDatasource: RegisterUserDatasource
    ){}

    getUserById(userId: number, id_register_type: number): Promise<RegisterUserEntity> {
       return this.registerUserDatasource.getUserById(userId, id_register_type);
    }
    getUsers(): Promise<RegisterUserEntity[]> {
        return this.registerUserDatasource.getUsers()
    }
    createRegister(registerUserDto: RegisterDto): Promise<RegisterUserEntity> {
        return this.registerUserDatasource.createRegister(registerUserDto)
    }

}