import { Optional } from 'src/utilidad/Optional';
import { v4 as uuidv4 } from 'uuid';

export class IdTarea {
    
    private UUID: string;

    private constructor(id: Optional<string>) {
        if(id.hasvalue()){
            this.UUID = id.getValue();
        }
        else{
            this.UUID = uuidv4();
        }
    }

    getIdTarea() {
        return this.UUID;
    }
    
    static create(id?: string): IdTarea {
        return new IdTarea(new Optional<string>(id));
    }

}