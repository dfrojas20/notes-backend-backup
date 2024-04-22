import { Optional } from 'src/utilidad/Optional';
import { v4 as uuidv4 } from 'uuid';

export class IdNota {
    
    private UUID: string;

    private constructor(id: Optional<string>) {
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIDNota() {
        return this.UUID;
    }
    
    static create(id?: string): IdNota {
        return new IdNota(new Optional<string>(id));
    }

}