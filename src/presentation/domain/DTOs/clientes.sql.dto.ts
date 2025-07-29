
export class InsertClienteDtoSQL{
    private constructor(
        public readonly nombre:string,){}

    static create(props:{[key:string]:any;}):[string?,InsertClienteDtoSQL?]{
    const{nombre} = props;

    return[undefined,
        new InsertClienteDtoSQL(
            nombre,
        )
    ];
}
}

export class ListarClientesDtoSQL{
    private constructor(
        public readonly id:number,
        public readonly nombre:string,
    ){}

    static fromEntity(entity:any):ListarClientesDtoSQL{
        return new ListarClientesDtoSQL(
            entity.id,
            entity.nombre
        )
    }

    static fromEntities(entities:any[]):ListarClientesDtoSQL[]{
        return entities.map(ListarClientesDtoSQL.fromEntity);
    }
}

