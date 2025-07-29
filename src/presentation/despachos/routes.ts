import { Router } from "express";
import { DespachosControllerSQL } from "./controller.sql";
import { DespachoServiceSQL } from "../../service/despacho.service.sql";

export class DespachosRoutes{
    static get routes():Router{

    
        const router = Router();


        const despachosServiceSQL = new DespachoServiceSQL();
        const controllerSQL = new DespachosControllerSQL(despachosServiceSQL);

        router.post('/',controllerSQL.crearDespacho);

        router.get('/',controllerSQL.getAllDespachos);

        return router;
    }
}