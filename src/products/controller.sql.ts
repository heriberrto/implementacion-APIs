import { Request, Response } from "express";
//import { AppDataSource } from "../presentation/config/sql";
import { Licor } from "../sql/modelos/licor.entity.sql";
import { LicorServiceSQL } from "../service/licor.service.sql";
import { InsertLicorDtoSQL } from "../presentation/domain/DTOs/licor.sql.dto";
import { ListarLicorDtoSQL } from "../presentation/domain/DTOs/licor.sql.dto";
import { CustomError } from "../presentation/domain/customerrors/custom.error";

export class LicorControllerSQL{
    constructor(
        private readonly licorServicesql:LicorServiceSQL,
    ){ }

    private handleError = (error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'});
    }

    createLicor = (req:Request, res:Response)=>{
        console.log('BODY: ',req.body);
        const [error,insertLicorDtoSQL] = InsertLicorDtoSQL.create({
            ...req.body,
        });
        if(error) return res.status(400).json({error});

        const entity = this.licorServicesql.insertLicorSQL(insertLicorDtoSQL!);
        return res.status(201).json({message: "Licor insertado correctamente"});
    }

    getAll = async (req:Request,res:Response) =>{
        const entidades = this.licorServicesql.getAllSQL();
        const response = ListarLicorDtoSQL.fromEntities(await entidades);
        return res.status(201).json(response);
        
    }
}
