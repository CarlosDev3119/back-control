import { RegisterDto } from "../../dtos/registers/registerUser.dto";
import { RegisterUserEntity } from "../../entities/registerUser.entity";



export abstract class RegisterUserDatasource {

    abstract getUserById(userId: number, id_register_type: number): Promise<RegisterUserEntity>

    abstract getUsers(): Promise<RegisterUserEntity[]>

    abstract createRegister(registerDto: RegisterDto): Promise<RegisterUserEntity>
}