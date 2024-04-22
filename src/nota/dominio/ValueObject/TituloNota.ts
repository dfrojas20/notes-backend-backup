import { Either } from "src/utilidad/Either";

export class TituloNota {
    private titulo: string;

    private constructor(titulo: string) {
        this.titulo = titulo;
    }

    getTituloNota(): string{
        return this.titulo;
    }

    private isValid(): boolean {
        return this.titulo.length > 0 && this.titulo.length <= 40;
    }

    static create(titulo: string): Either<Error,TituloNota> {
        const tituloNota = new TituloNota(titulo);
        if(tituloNota.isValid()){
            return Either.makeRight<Error,TituloNota>(tituloNota);
        }
        else{
            return Either.makeLeft<Error,TituloNota>(new Error('El titulo de la nota no es valido'));
        }
    }
}