import { Optional } from "src/utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class IdCarpeta{
    private UUID: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIDCarpeta(){
        return this.UUID;
    }

    static create(id?: string): IdCarpeta{
        return new IdCarpeta(new Optional<string>(id));
    }
}