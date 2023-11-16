import { Router } from 'express'
import { AuthRoutes } from '../auth/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/control/auth', AuthRoutes.routes );

        return router
    }

}

