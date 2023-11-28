import { UpdatedUserDto } from "../../dtos/users/updated-user.dto"
import { UserEntity } from "../../entities/user.entity"
import { UserRepository } from "../../repositories/users/user.repository"


export interface UpdateUserUseCase {
    execute(dto: UpdatedUserDto): Promise<UserEntity>
}

export class UpdateUser implements UpdateUserUseCase {


    constructor(
        private readonly repository: UserRepository
    ){}

    execute(dto: UpdatedUserDto): Promise<UserEntity> {
        return this.repository.updated(dto);
    }

}


