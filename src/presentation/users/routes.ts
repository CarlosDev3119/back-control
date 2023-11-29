
import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "./controller";

import { UserRepositoryImpl } from "../../infrastructure/repositories/users/user.repository.impl";
import { UserDatasourceImpl } from "../../infrastructure/datasources/users/user.datasource.impl";
import { ValidateAdminRoleMiddleware } from "../middlewares/validate-admin.middleware";




export class UserRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new UserDatasourceImpl();
        const userRepository = new UserRepositoryImpl(datasource);
        const userController = new UserController(userRepository);


        router.get('/',[AuthMiddleware.validateJWT], userController.getAllUsers);
        
        router.get('/:id',[AuthMiddleware.validateJWT], userController.getUserById);

        router.post('/', [AuthMiddleware.validateJWT, ValidateAdminRoleMiddleware.validateAdminRole], userController.createUser);

        router.put('/:id',[AuthMiddleware.validateJWT], userController.updatedUser);

        router.delete('/:id',[AuthMiddleware.validateJWT,  ValidateAdminRoleMiddleware.validateAdminRole], userController.deteleUser)


        return router;
    }

}