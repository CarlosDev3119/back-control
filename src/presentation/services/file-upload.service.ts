import { UploadedFile } from "express-fileupload";
import { UUID } from "../../config";
import fs, { existsSync } from "fs";
import path from "path";




export class FileUploadService {

    constructor(
        private readonly uuid = UUID.v4,
    ){}

    private checkFolder( folderPath: string ){
        if( !existsSync(folderPath) ){
            fs.mkdirSync(folderPath);
        }
    }  

    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['pdf', 'jpg', 'png', 'jpeg']
    ){

        const fileExtension = file.mimetype.split('/').at(1) ?? '';
        const name = file.name.split('.').at(0) ?? '';

        if( !validExtensions.includes(fileExtension)){
            throw new Error(`Invalid file extension: ${fileExtension} valid ones ${validExtensions}` );
        }

        const destination = path.resolve( __dirname, '../../../', folder );
        console.log(destination)



    }



}