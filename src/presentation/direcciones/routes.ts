import { Router } from "express";
import { DireccionesControllerSQL } from "./controller.sql";
import { DireccionesServiceSQL } from "../../service/direcciones.service.sql";


export class DireccionesRoutes{
    static get routes():Router{

        const router = Router();

        const direccionesServiceSQL = new DireccionesServiceSQL();
        const controllerSQL = new DireccionesControllerSQL(direccionesServiceSQL);


        router.post('/',controllerSQL.createDireccion);
        router.get('/',controllerSQL.getAll);




        return router;
    }
}