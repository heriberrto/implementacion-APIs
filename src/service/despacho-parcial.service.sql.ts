import { DespachoServiceSQL } from "./despacho.service.sql";

type ParcialEstado = {
    cliente?:string,
    licor?:string,
    direccion?: string, 
}

class EstadoParcial {
    private estado: ParcialEstado = {};
    private despachoService = new DespachoServiceSQL();

    setCliente(nombre:string){
        this.estado.cliente = nombre;
        this.verificarDespacho();
    }

    setDireccion(nombre:string){
        this.estado.direccion = nombre;
    }

    setLicor(nombre:string){
        this.estado.licor = nombre;
    }

    private async verificarDespacho(){
        const{cliente,direccion,licor} = this.estado;

        if(cliente&&direccion&&licor){
            await this.despachoService.insertarDespacho(cliente,direccion,licor);
            console.log("Despacho generado");

            this.estado = {};
        }
    }

}

export const estadoParcial = new EstadoParcial();