import { Request, Response, Router } from "express";
import { AuthService } from "../presentation/services/auth.service";
import { AuthController } from "./controller";


export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController( authService );

        router.post('/register', controller.registerUser);
        router.post('/login', controller.loginUser);


        return router;
    }

}