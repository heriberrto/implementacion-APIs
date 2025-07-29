import { Request, Response } from "express";
import { DespachoServiceSQL } from "../../service/despacho.service.sql";
import { CustomError } from "../domain/customerrors/custom.error";

export class DespachosControllerSQL{
    constructor(
        private readonly despachosServiceSQL:DespachoServiceSQL,
    ){}

    private handleError = (error:unknown, res:Response)=>{
            if(error instanceof CustomError){
                return res.status(error.statusCode).json({error:error.message});
            }
    
            console.log(`${error}`);
            return res.status(500).json({error:'Internal server error'});
        }

        crearDespacho = async(req:Request,res:Response)=>{
            const {nombre_del_cliente,direccion_del_cliente,nombre_del_licor} = req.body;

            if(!nombre_del_cliente||!direccion_del_cliente||!nombre_del_licor){
                return res.status(400).json({error:"Faltan campos obligatorios"});

            }
            await this.despachosServiceSQL.insertarDespacho(nombre_del_cliente,direccion_del_cliente,nombre_del_licor);
        }


    
        getAllDespachos = async(req:Request,res:Response)=>{
            const data = await this.despachosServiceSQL.getDespachos();
            res.json(data);
        }
}