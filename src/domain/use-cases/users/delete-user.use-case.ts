import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from '../../repositories/users/user.repository';


interface DeleteUserUseCase {
    execute(id_user: number): Promise<UserEntity>
}

export class DeleteUser implements DeleteUserUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ){}

    execute(id_user: number): Promise<UserEntity> {
        return this.userRepository.deleteById(id_user);
    }

}