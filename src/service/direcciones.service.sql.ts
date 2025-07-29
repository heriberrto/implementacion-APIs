import { InsertDireccionesDtoSQL } from "../presentation/domain/DTOs/direcciones.service.sql.dot";
import { CustomError } from "../presentation/domain/customerrors/custom.error";
import { MySQLDatabase } from "../presentation/config/sql.connection";
import { estadoParcial } from "./despacho-parcial.service.sql";


export class DireccionesServiceSQL{
    async insertDireccionesSQL(insertDireccionesDtoSQL:InsertDireccionesDtoSQL):Promise<void>{
        try{

            const connection = MySQLDatabase.getConnection();
            const query = `
        INSERT INTO direcciones 
        (calle, barrio, carrera, numeral)
        VALUES (?, ?, ?, ?)
      `;

            const values = [
                insertDireccionesDtoSQL.calle,
                insertDireccionesDtoSQL.barrio,
                insertDireccionesDtoSQL.carrera,
                insertDireccionesDtoSQL.numeral,
            ]

            const [resultado]:any = await connection.execute(query,values);
            /*const id = resultado.insertId;
            estadoParcial.setDireccion(id);*/

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getAllSQL():Promise<any[]>{
        try{
            const connection = MySQLDatabase.getConnection();
            const [rows] = await connection.execute('SELECT * FROM direcciones');
            return rows as any[];

        }catch(error){
            throw CustomError.internalServer(`Error al obtener licores: ${error}`)
        }
    }
}