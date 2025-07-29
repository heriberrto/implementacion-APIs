import { InsertClienteDtoSQL } from "../presentation/domain/DTOs/clientes.sql.dto";
import { CustomError } from "../presentation/domain/customerrors/custom.error";
import { MySQLDatabase } from "../presentation/config/sql.connection";
import { estadoParcial } from "./despacho-parcial.service.sql";

export class ClientesServiceSQL{
    async insertClienteSQL(insertClienteDtoSQL:InsertClienteDtoSQL):Promise<void>{
        try{
            const connection = MySQLDatabase.getConnection();

            const query = `
            INSERT INTO clientes
            (nombre)
            VALUES(?)
            `;

            const values = [
                insertClienteDtoSQL.nombre,
            ]

            const [resultado]:any = await connection.execute(query,values);
            /*const id = resultado.insertId;
            estadoParcial.setCliente(id);*/
            

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getAllSQL():Promise<any[]>{
        try{

            const connection = MySQLDatabase.getConnection();
            const[rows] = await connection.execute('SELECT * FROM clientes');

            return rows as any[];

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
    }
}