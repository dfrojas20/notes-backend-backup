import { Optional } from "src/utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class IdUsuario{
    private UUID: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIDUsuario(){
        return this.UUID;
    }

    static create(id?: string): IdUsuario{
        return new IdUsuario(new Optional<string>(id));
    }
}