import { Router } from "express";
import { DegreeController } from "./degree.controller";
import { DegreeRepositoryImpl } from "../../infrastructure/repositories/degrees/degree.repository.impl";
import { DegreeDatasourceImpl } from "../../infrastructure/datasources/degrees/degree.datasource.impl";



export class DegreeRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new DegreeDatasourceImpl();
        const degreeRepository = new DegreeRepositoryImpl(datasource);

        const degreeController = new DegreeController(degreeRepository);

        router.get('/', degreeController.getDegrees );

        return router;
    }

}