import { BcryptAdapter } from "../../../config";
import { prisma } from "../../../data/mysql/config";
import { CustomError, RegisterUserDto, UserDatasource, UserEntity } from "../../../domain";
import { UpdatedUserDto } from "../../../domain/dtos/users/updated-user.dto";
import { UserMapper } from "../../mappers/user.mapper";

enum Status {
    active = "active",
    inactive = "inactive"
}

type User = ({
    degrees: {
        id_degree: number;
        degree: string;
    } | null;
} & {
    id_user: number;
    name_user: string;
    last_name: string;
    middle_name: string;
    email: string | null;
    password: string;
    register_number: string;
    id_degree: number | null;
    role: string | null;
    status_user: Status
}) | null


type HashFunction = (password: string) => string;

export class UserDatasourceImpl implements UserDatasource {

    
    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    ){}
    
    async createUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const {email, password} = registerUserDto;

        try{
            const existUser = await prisma.users.findFirst( { 
                where: {
                    email: email
                }
            } );

            if(existUser) throw CustomError.badRequest('Email already Exist');

            registerUserDto.password = this.hashPassword( password );

            const user = await this.registerUser( registerUserDto );

            return UserMapper.userEntityFromObject(user);

        }catch(error){

            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();

        }

    }
    
    async getUsers(): Promise<UserEntity[]> {

        try{
            
            const users = await prisma.users.findMany({ 
                include: {
                    degrees: true,
                },
            });

            return users.map( user => UserMapper.userEntityFromObject({degree: user.degrees?.degree, ...user}) );

        }catch(error){
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    
    async findById(id_user: number): Promise<UserEntity> {
        
        try{

            const user = await prisma.users.findUnique({
                where: {id_user},
                include: {
                    degrees: true,
                },
            })

            if( !user ) throw CustomError.badRequest('User Not exist');
            
            return UserMapper.userEntityFromObject({degree: user?.degrees?.degree, ...user});

        }catch(error){
            
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    deleteById(id_user: number): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    
    async updated(userUpdatedDto: UpdatedUserDto): Promise<UserEntity> {
        
        try{

            await this.findById(userUpdatedDto.id_user);

            if(userUpdatedDto.email){

                const user = await prisma.users.findUnique({
                    where: {email: userUpdatedDto.email },
                    include: {
                        degrees: true,
                    },
                })
                if( user ) throw CustomError.badRequest('User email exist');
            }

            const updatedUser = await prisma.users.update({
                where: { id_user: userUpdatedDto.id_user},
                data: userUpdatedDto.values,
                include: {
                    degrees: true,
                },
            });

            
            return UserMapper.userEntityFromObject({degree: updatedUser.degrees?.degree, ...updatedUser});

        }catch(error){
            
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    
    }



    private registerUser = async (registerUserDto: RegisterUserDto) => {
        const newUser = await prisma.users.create({ 
            data: registerUserDto,
        });

        const user =  await prisma.users.findUnique({
            where: {
                id_user: newUser.id_user, 
            },
            include: {
                degrees: true,
            },
        }) as User;

        return {degree: user?.degrees?.degree, ...user};
    }

}