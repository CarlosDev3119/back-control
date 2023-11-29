import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/users/user.repository";


export class GetUser {

    constructor(
       private readonly userRepository: UserRepository 
    ){}

    async execute(id_user: number): Promise<UserEntity>{
        return this.userRepository.findById(id_user);
        
    }

}