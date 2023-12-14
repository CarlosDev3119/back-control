import { RegisterUserEntity } from "../../entities/registerUser.entity";
import { RegisterUserRepository } from "../../repositories/registerUsers/registerUserRepository";


interface GetUsersUseCase {
    execute(id_user: number, id_register_type: number): Promise<RegisterUserEntity>
}

export class GetRegisterUser implements GetUsersUseCase {


    constructor(
        private readonly registerUserRepository: RegisterUserRepository
    ){}

    execute(id_user: number, id_register_type: number): Promise<RegisterUserEntity> {
        return this.registerUserRepository.getUserById(id_user, id_register_type);
    }


}