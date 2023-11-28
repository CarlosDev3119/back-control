import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/users/user.repository";


export class GetUsers {

    constructor(
       private readonly userRepository: UserRepository 
    ){}

    async execute(): Promise<UserEntity[]>{
        const users = this.userRepository.getUsers();

        return users
        
    }

}