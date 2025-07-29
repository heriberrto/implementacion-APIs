import { Request, Response } from "express";
import { InsertDireccionesDtoSQL, ListarDireccionesDtoSQL } from "../domain/DTOs/direcciones.service.sql.dot";
import { DireccionesServiceSQL } from "../../service/direcciones.service.sql";
import { ListarClientesDtoSQL } from "../domain/DTOs/clientes.sql.dto";
import { CustomError } from "../domain/customerrors/custom.error";

export class DireccionesControllerSQL{
    constructor(
        private readonly direccionesServiceSQL:DireccionesServiceSQL,
    ){}

    private handleError = (error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'});
    }

    createDireccion = (req:Request, res:Response)=>{
        const [error, insertDireccionDtoSQL] = InsertDireccionesDtoSQL.create({
            ...req.body,
        });

        if(error) return res.status(400).json({error});

        const entity = this.direccionesServiceSQL.insertDireccionesSQL(insertDireccionDtoSQL!);
        return res.status(201).json({message:"Direccion insertada correctamente"});
    }

    getAll = async(req: Request, res:Response)=>{
         
        const entidades = this.direccionesServiceSQL.getAllSQL();
        const response = ListarDireccionesDtoSQL.fromEntities(await entidades);
        return res.status(201).json(response);
    }
}