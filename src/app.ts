import { envs } from "./presentation/config/envs";
import {Server} from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { MySQLDatabase } from "./presentation/config/sql.connection";

(async()=>{
    main();
})();

async function main(){
    /*await MongoDatabase.connect({
        dbName:envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_URL,
    });*/

    await MySQLDatabase.conexion();

    const server = new Server({
        port:envs.PORT,
        routes:AppRoutes.routes,
    });

    server.start();
}