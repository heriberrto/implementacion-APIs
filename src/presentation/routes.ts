import { Router } from "express";
import { LicorRoutes } from "../products/routes";
import { VentasRoutes } from "../selling/routes";
import { ClientesRoutes } from "./clientes/routes";
import { DireccionesRoutes } from "./direcciones/routes";
import { DespachosRoutes } from "./despachos/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();

        //definicion de rutas
        router.use('/api/products',LicorRoutes.routes);
        router.use('/api/selling',VentasRoutes.routes);
        router.use('/api/clientes',ClientesRoutes.routes);
        router.use('/api/direcciones',DireccionesRoutes.routes);
        router.use('/api/despachos',DespachosRoutes.routes);

        return router;
    }
}