import { CustomError, DegreeEntity, UserEntity } from "../../domain";


export class UserMapper {

  
  static userEntityFromObject(object: { [key: string]:any }) {

    const { id_degree, degree } = object;
 
    if(!id_degree) throw CustomError.badRequest('Missing id_degree');
    
    if(!degree) throw CustomError.badRequest('Missing degree');

    return new DegreeEntity(+id_degree, degree);
  }




}