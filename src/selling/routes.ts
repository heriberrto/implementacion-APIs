import { Response, Request } from "express";
import { CustomError } from "../presentation/domain/customerrors/custom.error";
import { VentaServiceSQL} from "../service/venta.service.sql";
import { Router } from "express";
import { VentaControllerSQL } from "./controller.sql";

export class VentasRoutes{
    static get routes():Router{

        const router = Router();
        const ventaServicesql = new VentaServiceSQL();
        const controller = new VentaControllerSQL(ventaServicesql);


        router.delete('/',controller.deleteLicorFromBody);



        return router;
    }
}