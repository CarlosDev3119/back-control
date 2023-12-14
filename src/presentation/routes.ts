import { Router } from 'express'
import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './users/routes';
import { DegreeRoutes } from './degrees/routes';
import { DocumentTypesRoutes } from './documentTypes/routes';
import { DocumentUserRoutes } from './documents/routes';
import { PeriodRoutes } from './periods/routes';
import { SemesterRoutes } from './semesters/routes';
import { RegisterUserRoutes } from './registerUsers/routes';
import { AdminRoutes } from './admin/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/control/auth', AuthRoutes.routes );
        router.use('/api/v1/control/users', UserRoutes.routes );
        router.use('/api/v1/control/degrees', DegreeRoutes.routes );
        router.use('/api/v1/control/documentTypes', DocumentTypesRoutes.routes );
        router.use('/api/v1/control/documentUser', DocumentUserRoutes.routes );
        router.use('/api/v1/control/periods', PeriodRoutes.routes);
        router.use('/api/v1/control/semesters', SemesterRoutes.routes);
        router.use('/api/v1/control/registerUsers', RegisterUserRoutes.routes);
        router.use('/api/v1/control/admin', AdminRoutes.routes);
        
        return router
    }

}

