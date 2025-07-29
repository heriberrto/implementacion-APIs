import { Router } from "express";
//import { LicorController } from "./controller";
//import { LicorService } from "../service/licor.service";
import { LicorControllerSQL } from "./controller.sql";
import { LicorServiceSQL } from "../service/licor.service.sql";


export class LicorRoutes{
    static get routes():Router{
        const router = Router();
        
        const licorServicesql = new LicorServiceSQL();
        const controllerSQL = new LicorControllerSQL(licorServicesql);
       

        //rutas MySQL
        router.post('/',controllerSQL.createLicor);
        router.get('/',controllerSQL.getAll);


        return router;
    }
}