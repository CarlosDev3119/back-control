
import { Router } from "express";
import { AdminController } from "./controller";






export class AdminRoutes {

    static get routes(): Router {
        const router = Router();
        const registerController = new AdminController();

        router.get('/registertypes', registerController.getRegisterTypes );
        router.get('/user', registerController.getDataUsers );
        router.post('/getallbyuser', registerController.getAllDataByUser );
        router.put('/update', registerController.updateDocumentUser );
        router.get('/document', registerController.getDocument );
        router.post('/isregister', registerController.setRegisterUser );
        
 


        return router;
    }

}