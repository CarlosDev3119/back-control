import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos/login-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/auth/auth.repository";

interface UserToken {
    token: string;
    user: UserEntity
  }

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUseCase {
    execute( loginUseDto: LoginUserDto ): Promise<UserToken>;
  }

export class LoginUser implements LoginUseCase {


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ){}

    async execute(loginUseDto: LoginUserDto): Promise<UserToken> {

        const user = await this.authRepository.login(loginUseDto);

        const token = await this.signToken({id_user: user.id_user});
        if ( !token ) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: user
        }
    }

}