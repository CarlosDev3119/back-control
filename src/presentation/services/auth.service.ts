import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { prisma } from "../../data/postgres/config";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";



export class AuthService {

    constructor(){};

    public async registerUser( registerUserDto: RegisterUserDto){

        const existUser = await prisma.users.findFirst({
            where: { email: registerUserDto.email }
        });

        if(existUser) throw CustomError.badRequest('Email already exist');

        try{
            const userDto = {...registerUserDto};

            userDto.password = BcryptAdapter.hash( registerUserDto.password);

            const user = await prisma.users.create({
                data: userDto!
            })

            const {password, ...userEntity} = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token: 'ABC'
            }

        }catch(error){
            throw CustomError.internalServer(`${error}`);
        }


    }

    public async loginUser(loginUserDto: LoginUserDto){

        const existUser = await prisma.users.findFirst({
            where: { email: loginUserDto.email}
        })

        if(!existUser) throw CustomError.badRequest('Email not exist');

        try{

            const isMatching = BcryptAdapter.compare(loginUserDto.password, existUser.password);
            if(!isMatching) throw CustomError.badRequest('Password is not valid');

            const { password, ...userEntity} = UserEntity.fromObject( existUser );

            return {
                user: userEntity,
                token: 'ABC'
            }

        }catch(error){

            throw CustomError.internalServer(`${error}`)

        }

    }

}