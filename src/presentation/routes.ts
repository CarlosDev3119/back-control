import { Router } from 'express'
import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './users/routes';
import { DegreeRoutes } from './degrees/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/control/auth', AuthRoutes.routes );
        router.use('/api/v1/control/users', UserRoutes.routes );
        router.use('/api/v1/control/degrees', DegreeRoutes.routes );

        return router
    }

}

