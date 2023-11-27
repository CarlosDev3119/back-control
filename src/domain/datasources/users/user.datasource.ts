import { RegisterUserDto } from "../../dtos/register-user.dto";
import { PaginationDto } from "../../dtos/shared/pagination.dto";
import { UserEntity } from "../../entities/user.entity";

export abstract class UserDatasource {

    abstract createUser( registerUserDto: RegisterUserDto): Promise<UserEntity>

    abstract getUsers(paginationDto: PaginationDto): Promise<UserEntity[]>

} 