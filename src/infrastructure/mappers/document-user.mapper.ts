import { CustomError, DegreeEntity, UserEntity } from "../../domain";
import { DocumentUserEntity } from "../../domain/entities/document.user.entity";


export class DocumentUserMapper {

  
  static FromObject(object: { [key: string]:any }) {

    const {id_user_document,  id_user, id_document, id_register_type, date_approval, date_register} = object;
    



    return new DocumentUserEntity(+id_user_document, +id_user, id_document, +id_register_type, date_approval, date_register);
  }




}