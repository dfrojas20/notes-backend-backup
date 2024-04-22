import { Either } from "src/utilidad/Either";
import { ClaveUsuario } from "./ValueObject/ClaveUsuario";
import { CorreoUsuario } from "./ValueObject/CorreoUsuario";
import { FechaNacimiento } from "./ValueObject/FechaNacimiento";
import { IdUsuario } from "./ValueObject/IdUsuario";
import { NombreUsuario } from "./ValueObject/NombreUsuario";

export class Usuario{
    private id: IdUsuario;
    private nombre: NombreUsuario;
    private correo: CorreoUsuario;
    private clave: ClaveUsuario;
    private fechaNacimiento: FechaNacimiento;
    private suscripcion: boolean;
    private constructor(nombre: NombreUsuario, correo: CorreoUsuario, clave: ClaveUsuario, fechaNacimiento: FechaNacimiento,suscripcion:boolean,id?: IdUsuario){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.clave = clave;
        this.fechaNacimiento = fechaNacimiento;
        this.suscripcion = suscripcion;
    }

    public getId(): string{
        return this.id.getIDUsuario();
    }

    public getSuscripcion(): boolean{
        return this.suscripcion;
    }

    public getNombre(): string{
        return this.nombre.getNombreUsuario();
    }

    public getCorreo(): string{
        return this.correo.getCorreoUsuario();
    }

    public getClave(): string{
        return this.clave.getClaveUsuario();
    }

    public getFechaNacimiento(): Date{
        return this.fechaNacimiento.getFechaNacimiento();
    }

    static create(nombre: string, correo: string, clave: string, fechaNacimiento: Date,suscripcion:boolean,id?: string): Either<Error,Usuario>{
        const nombreUsuario = NombreUsuario.create(nombre);
        if(nombreUsuario.isLeft()){
            return Either.makeLeft<Error,Usuario>(nombreUsuario.getLeft());
        }
        else{
            const correoUsuario = CorreoUsuario.create(correo);
            if(correoUsuario.isLeft()){
                return Either.makeLeft<Error,Usuario>(correoUsuario.getLeft());
            }
            else{
                const claveUsuario = ClaveUsuario.create(clave);
                if(claveUsuario.isLeft()){
                    return Either.makeLeft<Error,Usuario>(claveUsuario.getLeft());
                }
                else{
                    const fechaNacimientoUsuario = FechaNacimiento.create(fechaNacimiento);
                    if(fechaNacimientoUsuario.isLeft()){
                        return Either.makeLeft<Error,Usuario>(fechaNacimientoUsuario.getLeft());
                    }
                    else{
                        return Either.makeRight<Error,Usuario>(new Usuario(nombreUsuario.getRight(),correoUsuario.getRight(),claveUsuario.getRight(),fechaNacimientoUsuario.getRight(),suscripcion,IdUsuario.create(id)));
                    }
                }
            }
        }
    }
}