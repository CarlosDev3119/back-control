import { Router } from "express";

import { PeriodDatasourceImpl } from '../../infrastructure/datasources/periods/period.datasource.impl';
import { PeriodRepositoryImpl } from '../../infrastructure/repositories/periods/period.repository.impl';
import { PeriodController } from './controller';



export class PeriodRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new PeriodDatasourceImpl();
        const periodRepository = new PeriodRepositoryImpl(datasource);

        const periodController = new PeriodController(periodRepository);

        router.get('/', periodController.getAllPeriods );

        return router;
    }

}