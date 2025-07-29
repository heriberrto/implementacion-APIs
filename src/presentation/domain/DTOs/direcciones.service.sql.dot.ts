export class InsertDireccionesDtoSQL{
    private constructor(
        public readonly calle:string,
        public readonly barrio: string,
        public readonly carrera: string,
        public readonly numeral: string,
    ){}

    static create(props:{[key:string]:any}):[string?,InsertDireccionesDtoSQL?]{
        const{
            calle,
            barrio,
            carrera,
            numeral
        } = props;

        return[
            undefined,
            new InsertDireccionesDtoSQL(
                calle,
                barrio,
                carrera,
                numeral,
            )
        ];
    }
}
export class ListarDireccionesDtoSQL{
    private constructor(
        public readonly id: number,
        public readonly calle:string,
        public readonly barrio: string,
        public readonly carrera: string,
        public readonly numeral: string,
    ){}
    static fromEntity(entity:any): ListarDireccionesDtoSQL{
        return new ListarDireccionesDtoSQL(
            entity.id,
            entity.calle,
            entity.barrio,
            entity.carrera,
            entity.numeral,
        );
    }
    static fromEntities(entities:any[]):ListarDireccionesDtoSQL[]{
        return entities.map(ListarDireccionesDtoSQL.fromEntity);
    }
}