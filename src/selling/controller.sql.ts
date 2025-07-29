import { Request, Response } from "express";
import { CustomError } from "../presentation/domain/customerrors/custom.error";
import { VentaServiceSQL} from "../service/venta.service.sql";

export class VentaControllerSQL{
    constructor(
        private readonly ventaServicesql:VentaServiceSQL,
    ){}

    private handleError = (error:unknown, res:Response) =>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});
        }

        console.log(`${error}`);
        return res.status(500).json({error:'Internal server error'});
    }

    deleteLicorFromBody = async (req:Request, res:Response)=>{
        const {id} = req.body;

        if(isNaN(id)){
            res.status(400).json({error:'ID no valido'})
        }

        const entity = await this.ventaServicesql.borrarLicorSQL(id);
        const fechaFinalizado = new Date();
        return res.status(200).json({mensaje:`El licor fue venedido satisfactoriamente el dia ${fechaFinalizado}`});
    }
}