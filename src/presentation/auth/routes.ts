import { Router } from "express";
import { AuthController } from "./controller";
import { ValidateUserMiddleware } from '../middlewares/validate-user.middleware';
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthDatasourceImpl } from "../../infrastructure/datasources/auth/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth/auth.repository.impl";





export class AuthRoutes {

    static get routes(): Router {
        const router = Router();


        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);

        const authController = new AuthController( authRepository);


        router.post('/register',[ValidateUserMiddleware.validateRegisterNumber], authController.registerUser);

        router.post('/login', authController.loginUser);

        router.get('/renew',[ AuthMiddleware.validateJWT], authController.renew);


        return router;
    }

}