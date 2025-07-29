import { MySQLDatabase } from "../presentation/config/sql.connection";
import { CustomError } from "../presentation/domain/customerrors/custom.error";

export class VentaServiceSQL{
    async borrarLicorSQL(id:number){
        try{

            const connection = MySQLDatabase.getConnection();

            const [resultado]:any = await connection.execute(
                `SELECT id FROM despachos WHERE id = ?`,[id]
            );

            if(!resultado.length){
                throw CustomError.notFound(`No existe el despacho con id ${id}`);
            }

            await connection.execute(`DELETE FROM despachos WHERE id = ?`,[id]);



        }catch(error){
            throw CustomError.internalServer(`Esta ID no existe: ${error}`)
        }
    }
}