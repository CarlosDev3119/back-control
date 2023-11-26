import { BcryptAdapter } from "../../../config/bcrypt.adapter";
import { prisma } from "../../../data/mysql/config";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, Status, UserEntity } from "../../../domain";
import { UserMapper } from "../../mappers/user.mapper";

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
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){}
    

    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        const {email, password} = loginUserDto;

        try {
            const existUser = await prisma.users.findFirst( { 
                where: {
                    email: email
                },
                include: {
                    degrees: true,
                },
            } );
     
            if ( !existUser ) throw CustomError.badRequest('User does not exists - email');
      
            const isMatching = this.comparePassword(password, existUser.password);
            if ( !isMatching ) throw CustomError.badRequest('Password is not valid');
      
            return UserMapper.userEntityFromObject({degree: existUser.degrees?.degree, ...existUser});
      
      
          } catch (error) {
            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
          }

    
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { email, password } = registerUserDto;

        try{

            const existUser = await prisma.users.findFirst( { 
                where: {
                    email: email
                }
            } );
            if(existUser) throw CustomError.badRequest('Email already Exist');

            registerUserDto.password = this.hashPassword( password );
            const user = await this.registerUser(registerUserDto);


            return UserMapper.userEntityFromObject(user);

        }catch(error){

            if( error instanceof CustomError ) {
                throw error;
            }
            throw CustomError.internalServer();
        }
        
    }

    private  registerUser = async (registerUserDto: RegisterUserDto) => {
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