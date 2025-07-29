import { MySQLDatabase } from "../presentation/config/sql.connection";
import { CustomError } from "../presentation/domain/customerrors/custom.error";

export class DespachoServiceSQL{

    async insertarDespacho(
        nombre_cliente: string,
        lugar_direccion: string,
        nombre_licor: string,
    ):Promise<void>{
        try{
            const connection = MySQLDatabase.getConnection();

            const [clienteRows] = await connection.execute(`SELECT id from clientes where nombre = ?`, [nombre_cliente]);
            const cliente = (clienteRows as any[])[0];
            if(!cliente) throw new Error (`el cliente de nombre ${nombre_cliente} no fue encontrado`);

            const [licoresRows] = await connection.execute(`SELECT id from licores where tipo_licor = ?`, [nombre_licor]);
            const licor = (licoresRows as any[])[0];
            if(!licor) throw new Error (`el licor ${nombre_licor} no fue encontrado`);

            const [direccionesRows] = await connection.execute(`SELECT id from direcciones where calle = ?`, [lugar_direccion]);
            const direccion = (direccionesRows as any[])[0];
            if(!cliente) throw new Error (`la direccion ${lugar_direccion} no se encuentra disponible`);

            

            const query = `
        INSERT INTO despachos (fecha, id_cliente ,nombre_del_cliente, id_direccion, direccion_del_cliente, id_licor, nombre_del_licor)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

            const values = [new Date(),cliente.id,nombre_cliente,direccion.id,,lugar_direccion,licor.id,nombre_licor];

            await connection.execute(query,values);

        }catch(error){
            throw CustomError.internalServer(`Error al insertar despacho: ${error}`);
        }
    }

    async getDespachos():Promise<any[]>{
        try{
            const connection = MySQLDatabase.getConnection();

            /*const [rows] = await connection.execute(`
            SELECT d.id, d.fecha,
                c.nombre AS cliente,
                l.nombre_marca AS licor,
                l.tipo_licor,
                di.calle, di.barrio, di.carrera, di.numeral
            FROM despachos d
            JOIN clientes c ON d.id_cliente = c.id
            JOIN direcciones di ON d.id_direccion = di.id
            JOIN licores l ON d.id_licor = l.id
            ORDER BY d.fecha DESC
            `);*/

            const [rows] = await connection.execute('SELECT * FROM despachos')
            return rows as any[];
        }catch(error){
            throw CustomError.internalServer(`Error al mostrar despachos: ${error}`);
        }
    }
}