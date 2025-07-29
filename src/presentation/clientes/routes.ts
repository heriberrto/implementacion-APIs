import {Router} from "express";

import { ClientesControllerSQL } from "./controller.sql";
import { ClientesServiceSQL } from "../../service/clientes.service.sql";

export class ClientesRoutes{
    static get routes():Router{

        const router = Router();

        const clientesServiceSQL = new ClientesServiceSQL();
        const controllerSQL = new ClientesControllerSQL(clientesServiceSQL);


        router.post('/',controllerSQL.insertarCliente);
        router.get('/',controllerSQL.getAll);


        return router
    }
}