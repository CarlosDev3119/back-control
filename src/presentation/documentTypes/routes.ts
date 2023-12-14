import { Router } from "express";
import { DocumentTypeController } from "./controller";
import { DocumentTypeDatasourceImpl } from "../../infrastructure/datasources/documents/document-types.datasource.impl";
import { DocumentTypeRepositoryImpl } from "../../infrastructure/repositories/documents/document-type.repository.impl";


export class DocumentTypesRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new DocumentTypeDatasourceImpl();
        const documentTypeRepository = new DocumentTypeRepositoryImpl( datasource );

        const controller = new DocumentTypeController(documentTypeRepository);

        router.get('/', controller.getDocuments );
        router.get('/inscription', controller.getDocumentInscription );
        router.get('/reinscription', controller.getDocumentReinscription );

        return router;
    }

}