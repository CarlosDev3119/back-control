import { Router } from "express";
import { SemesterDatasourceImpl } from "../../infrastructure/datasources/semester/semester.datasource.impl";
import { SemesterRepositoryImpl } from "../../infrastructure/repositories/semesters/semester.repository.impl";
import { SemesterController } from "./controller";





export class SemesterRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new SemesterDatasourceImpl();
        const semesterRepository = new SemesterRepositoryImpl(datasource);

        const periodController = new SemesterController(semesterRepository);

        router.get('/',  periodController.getAllsemesters);

        return router;
    }

}