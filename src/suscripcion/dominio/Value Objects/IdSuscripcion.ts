import { Optional } from "src/utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class IdSuscripcion{
    private UUID: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIdSuscricion(){
        return this.UUID;
    }

    static create(id?: string): IdSuscripcion{
        return new IdSuscripcion(new Optional<string>(id));
    }
}