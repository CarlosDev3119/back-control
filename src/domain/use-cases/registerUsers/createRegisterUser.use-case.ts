import { RegisterDto } from "../../dtos/registers/registerUser.dto";
import { RegisterUserEntity } from "../../entities/registerUser.entity";
import { RegisterUserRepository } from "../../repositories/registerUsers/registerUserRepository";



interface CreateRegisterUseCase {
    execute(registerDto: RegisterDto): Promise<RegisterUserEntity>
}

export class CreateRegisterUser implements CreateRegisterUseCase {

    constructor(
        public readonly registerUserRepository: RegisterUserRepository
    ){}

    execute(registerDto: RegisterDto): Promise<RegisterUserEntity> {
        return this.registerUserRepository.createRegister(registerDto)
    }

}