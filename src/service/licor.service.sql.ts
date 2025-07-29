//import { AppDataSource } from "../presentation/config/sql";
import { Licor } from "../sql/modelos/licor.entity.sql";
import { InsertLicorDtoSQL } from "../presentation/domain/DTOs/licor.sql.dto";
import { CustomError } from "../presentation/domain/customerrors/custom.error";
import { MySQLDatabase } from "../presentation/config/sql.connection";
import { estadoParcial } from "./despacho-parcial.service.sql";

export class LicorServiceSQL{
    async insertLicorSQL(insertlicorDtoSQL:InsertLicorDtoSQL): Promise<void>{
        try{
            const connection = MySQLDatabase.getConnection();
            const query = `
        INSERT INTO licores 
        (nombre_marca, tipo_licor, material, precio, litros,cantidad)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
            
            const values = [
                insertlicorDtoSQL.nombre_marca,
                insertlicorDtoSQL.tipo_licor,
                insertlicorDtoSQL.material,
                insertlicorDtoSQL.litros,
                insertlicorDtoSQL.precio,
                insertlicorDtoSQL.cantidad
            ];

            const[resultado]:any = await connection.execute(query,values);
            /*const id = resultado.insertId;
            estadoParcial.setCliente(id);*/

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
    }

    async getAllSQL():Promise<any[]>{
        try{

            const connection = MySQLDatabase.getConnection();
            const [rows] = await connection.execute('SELECT * FROM licores');
            return rows as any[];

        }catch(error){
            throw CustomError.internalServer(`Error al obtener licores: ${error}`)
        }
    }
}
