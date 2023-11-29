import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/register-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { CustomError } from "../../errors/custom.errors";
import { UserRepository } from "../../repositories/users/user.repository";

interface UserToken {
    token: string;
    user: UserEntity
  }

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface UserCreateUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;
  }


export class CreateUser implements UserCreateUseCase {

    constructor(
       private readonly userRepository: UserRepository,
       private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    async execute(registerUserDto: RegisterUserDto){
        const user = await this.userRepository.createUser(registerUserDto);

        const token = await this.signToken({id_user: user.id_user});
        if ( !token ) throw CustomError.internalServer('Error generating token');

        return {
            user: user,
            token: token
        }
        
    }

}