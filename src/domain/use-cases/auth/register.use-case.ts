import { JwtAdapter } from "../../../config/jwt.adapter";
import { RegisterUserDto } from "../../dtos/register-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/auth/auth.repository";

interface UserToken {
    token: string;
    user: UserEntity
  }

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;
  }

export class RegisterUser implements RegisterUserUseCase {


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

        const user = await this.authRepository.register(registerUserDto);

        const token = await this.signToken({id_user: user.id_user});
        if ( !token ) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: user
        }
    }

}