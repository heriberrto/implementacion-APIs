import mysql from 'mysql2/promise';
import { envs } from './envs';

export class MySQLDatabase{
    private static connection: mysql.Connection;

    public static async conexion(){
        this.connection = await mysql.createConnection({
            host:envs.DB_HOST||'localhost',
            user:envs.DB_USERNAME||'root',
            password:envs.DB_PASSWORD||'',
            database:envs.SQL_DB_NAME||'licores',
            port:envs.DB_PORT,
        });

        console.log("Conectado a MySQL en el puerto 3306");
    }

    public static getConnection(){
        return this.connection;
    }
}