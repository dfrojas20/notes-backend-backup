import { Optional } from "src/utilidad/Optional";
import { v4 as uuidv4 } from 'uuid';

export class idEtiqueta{
    private id: string;

    private constructor(id: Optional<string>){
        if(id.hasvalue()){
            this.id = id.getValue();
            console.log("id etiqueta 1",this.id)
        }
        else{
            this.id = uuidv4();
            console.log("id etiqueta 2",this.id)
        }
    }

    getIDEtiqueta(){
        return this.id;
    }

    static create(id?: string): idEtiqueta{
        return new idEtiqueta(new Optional<string>(id));
    }
}