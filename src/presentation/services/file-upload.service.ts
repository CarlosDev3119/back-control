import path from 'path';
import fs from 'fs';

import { UploadedFile } from 'express-fileupload';


import { CustomError } from '../../domain';




export class FileUploadService {


  constructor(
    private readonly id_document: string,
  ) {}

  
  private checkFolder( folderPath: string ) {
    if ( !fs.existsSync(folderPath) ) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png','pdf','jpg','jpeg']
  ) {

    try {
      const fileExtension = file.mimetype.split('/').at(-1) ?? '';
      if ( !validExtensions.includes(fileExtension) ) {
        throw CustomError
        .badRequest(`Invalid extension: ${ fileExtension }, valid ones ${ validExtensions }`);
      }
      
      const destination = path.resolve( __dirname, '../../../', folder );
      this.checkFolder( destination );

      const fileName = `${ this.id_document }.${ fileExtension }`;

      file.mv(`${destination}/${ fileName }`);

      return { fileName };

    } catch (error) {
      
      throw error;

    }



  }




}

