export class InsertLicorDtoSQL{
    private constructor(
        public readonly nombre_marca:string,
        public readonly tipo_licor:string,
        public readonly material:string,
        public readonly precio:number,
        public readonly litros:number,
        public readonly cantidad:number,
    ){}

    static create(props:{ [ key: string ]: any; } ):[string?,InsertLicorDtoSQL?]{
        const{
            nombre_marca,
            tipo_licor,
            material,
            precio,
            litros,
            cantidad
        } = props;

    
        return[
            undefined,
            new InsertLicorDtoSQL(
                nombre_marca,
                tipo_licor,
                material,
                precio,
                litros,
                cantidad,
            )
        ];
    }
}

export class ListarLicorDtoSQL{
    private constructor(
        public readonly id: number,
        public readonly nombre_marca:string,
        public readonly tipo_licor:string,
        public readonly material:string,
        public readonly precio:number,
        public readonly litros:number,
        public readonly cantidad:number,
    ){}

    static fromEntity(entity:any): ListarLicorDtoSQL{
        return new ListarLicorDtoSQL(
            entity.id,
            entity.nombre_marca,
            entity.tipo_licor,
            entity.material,
            entity.precio,
            entity.litros,
            entity.cantidad,
        );
    }

    static fromEntities(entities: any[]): ListarLicorDtoSQL[]{
        return entities.map(ListarLicorDtoSQL.fromEntity);
    }
}