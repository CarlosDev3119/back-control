import { Router } from "express";


import { RegisterUserController } from "./controller";
import { RegisterUserDatasourceImpl } from '../../infrastructure/datasources/registerUsers/registerUser.datasource.impl';
import { RegisterUserRepositoryImpl } from '../../infrastructure/repositories/registerUsers/registerUser.repository.impl';
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class RegisterUserRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new RegisterUserDatasourceImpl();
        const registerUserRepository = new RegisterUserRepositoryImpl( datasource );

        const registerUserController = new RegisterUserController(registerUserRepository);

        router.get('/', registerUserController.getAllRegisterUsers );
        
        router.get('/single',[AuthMiddleware.validateJWT], registerUserController.getRegisterUserById );
        router.post('/',[AuthMiddleware.validateJWT], registerUserController.createRegisterUser );

        return router;
    }

}