import { RegisterUserDto, UserDatasource, UserEntity, UserRepository } from "../../../domain";
import { UpdatedUserDto } from "../../../domain/dtos/users/updated-user.dto";

export class UserRepositoryImpl implements UserRepository{

    constructor(
        private readonly userDataSource: UserDatasource
    ){}

    createUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.userDataSource.createUser(registerUserDto);
    }

    getUsers(): Promise<UserEntity[]> {
        return this.userDataSource.getUsers();
    }

    findById(id_user: number): Promise<UserEntity> {
        return this.userDataSource.findById(id_user);
    }

    deleteById(id_user: number): Promise<UserEntity> {
        return this.userDataSource.deleteById(id_user);
    }
    
    updated(updatedUserDto: UpdatedUserDto): Promise<UserEntity> {
        return this.userDataSource.updated(updatedUserDto)
    }



}