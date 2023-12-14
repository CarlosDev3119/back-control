import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../../../presentation/services/file-upload.service";
import { DocumentRegisterEntity } from "../../entities/document-register.entity";
import { DocumentRegisterRepository } from "../../repositories/documents/document-register.repository";
import { DocumentDto } from '../../dtos/documents/document.dto';
import { prisma } from "../../../data/mysql/config";



interface DocumentRegisterUseCase {
    execute(
        documentRegisterDto: DocumentDto
    ):Promise<DocumentRegisterResponse>
}

interface DocumentRegisterResponse {
    data: DocumentRegisterEntity,
    fileName: string,
}


export class RegisterDocumentUseCase implements DocumentRegisterUseCase {

    constructor(
        private readonly files: UploadedFile,
        private readonly documentRepository: DocumentRegisterRepository
    ){}

    async execute(documentRegisterDto: DocumentDto): Promise<DocumentRegisterResponse> {

        const data = await this.documentRepository.create(documentRegisterDto);
        const fileUploadService = new FileUploadService(data.id_document.toString());
        const fileName = await fileUploadService.uploadSingle(this.files, data.path_document);

        const newpath = `${data.path_document}/${fileName.fileName}`;

        await prisma.$queryRaw`UPDATE documents
        SET path_document = ${newpath}
        WHERE id_document = ${data.id_document};`
        
        return {data, fileName: fileName.fileName}
    }

}