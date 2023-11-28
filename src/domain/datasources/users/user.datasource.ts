import { RegisterUserDto } from "../../dtos/register-user.dto";
import { UpdatedUserDto } from "../../dtos/users/updated-user.dto";
import { UserEntity } from "../../entities/user.entity";

export abstract class UserDatasource {

    abstract createUser( registerUserDto: RegisterUserDto): Promise<UserEntity>

    abstract getUsers(): Promise<UserEntity[]>

    abstract findById(id_user: number): Promise<UserEntity>

    abstract deleteById(id_user: number): Promise<UserEntity>

    abstract updated( updatedUserDto:UpdatedUserDto ): Promise<UserEntity>

}