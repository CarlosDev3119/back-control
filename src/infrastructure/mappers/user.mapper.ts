import { CustomError, UserEntity } from "../../domain";

interface User {
  id_user: number;
  name_user: string;
  last_name: string;
  middle_name: string;
  email: string;
  password: string;
  register_number: string;
  id_degree: number;
  role: string;
  status_user: string;
  degrees: {
      id_degree: number;
      degree: string;
  };
  [key: string]:any;
}


export class UserMapper {

  
  static userEntityFromObject(object: { [key: string]:any }) {

    const { 
        id_user,
        name_user,
        last_name,
        middle_name,
        email,
        register_number,
        degree,
        role
    } = object;

    // if ( !_id || !id ) {
    //   throw CustomError.badRequest('Missing id');
    // }

    if(!id_user) throw CustomError.badRequest('Missing id_user');
    if(!name_user) throw CustomError.badRequest('Missing name_user');
    if(!last_name) throw CustomError.badRequest('Missing last_name');
    if(!middle_name) throw CustomError.badRequest('Missing middle_name');
    if(!email) throw CustomError.badRequest('Missing email');
    if(!register_number) throw CustomError.badRequest('Missing register_number');
    if(!degree) throw CustomError.badRequest('Missing degree');
    if(!role) throw CustomError.badRequest('Missing role');  


    return new UserEntity(id_user, name_user, last_name, middle_name, email, register_number, degree, role);
  }




}