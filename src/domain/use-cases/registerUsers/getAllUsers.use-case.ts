import { RegisterUserEntity } from "../../entities/registerUser.entity";
import { RegisterUserRepository } from "../../repositories/registerUsers/registerUserRepository";



interface GetAllUSersUseCase {
    execute(): Promise<RegisterUserEntity[]>
}

export class GetAllRegisterUsers implements GetAllUSersUseCase {

    constructor(
        public readonly registerUserRepository: RegisterUserRepository
    ){}

    execute(): Promise<RegisterUserEntity[]> {
        return this.registerUserRepository.getUsers()
    }

}