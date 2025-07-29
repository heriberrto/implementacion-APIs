import { Request, Response } from "express";
import { ClientesServiceSQL } from "../../service/clientes.service.sql";
import { InsertClienteDtoSQL } from "../domain/DTOs/clientes.sql.dto";
import { ListarClientesDtoSQL } from "../domain/DTOs/clientes.sql.dto";
import { CustomError } from "../domain/customerrors/custom.error";

export class ClientesControllerSQL{
    constructor(
        private readonly clientesServiceSQL:ClientesServiceSQL,
    ){}

    private handleError = (error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'});
    }

    insertarCliente = (req:Request, res:Response)=>{
        const[error,insertClienteDtoSQL] = InsertClienteDtoSQL.create({...req.body});

        if(error) return res.status(400).json({error});

        const entity = this.clientesServiceSQL.insertClienteSQL(insertClienteDtoSQL!);
        return res.status(201).json({message:"Cliente insertado correctamente"});
    }

    getAll = async(req:Request, res:Response)=>{
        const entidades = this.clientesServiceSQL.getAllSQL();
        const response = ListarClientesDtoSQL.fromEntities(await entidades);
        return res.status(201).json(response);
    }
}