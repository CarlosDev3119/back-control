
import { Router } from "express";
import { DocumentUserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

import { DocumentRegisterDatasourceImpl } from "../../infrastructure/datasources/documents/document-register.datasource.impl";
import { DocumentRegisterRepositoryImpl } from "../../infrastructure/repositories/documents/document-register.repository.impl";
import { FileUploadMiddleware } from "../middlewares/FileUploadMiddleware";

export class DocumentUserRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new DocumentRegisterDatasourceImpl();
        const documentRepository = new DocumentRegisterRepositoryImpl( datasource );

        const controller = new DocumentUserController(documentRepository);

        router.get('/documentsIns', [AuthMiddleware.validateJWT],controller.getDocuments);
        router.get('/documentsReins', [AuthMiddleware.validateJWT],controller.getDocumentsReins);
        router.use(FileUploadMiddleware.containFiles) ;
        router.post('/create', [AuthMiddleware.validateJWT],controller.createRegisterDocument );

        return router;
    }

}


