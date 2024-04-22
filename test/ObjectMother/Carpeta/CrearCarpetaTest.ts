import { CrearCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/CrearCarpetaDto";
import { MockRepositorioCarpeta } from "../mocks/MockRepositorioCarpeta";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";

export class CrearCarpetaTest{

    public static CrearCarpetaTestValid(): CrearCarpetaDto{
        let carpeta = new CrearCarpetaDto();
        carpeta.nombre = "Carpeta de prueba";
        carpeta.predeterminada = false;
        carpeta.idUsuario = "1";
        return carpeta;
    }

    public static CrearCarpetaTestNoValid(): CrearCarpetaDto{
        let carpeta = new CrearCarpetaDto();
        carpeta.nombre = "Carpeta de prueba";
        carpeta.predeterminada = false;
        carpeta.idUsuario = "";
        return carpeta;
    }

    public static crearCarpetaService(){
        const mock = new MockRepositorioCarpeta();
        return new CrearCarpetaService(mock);
    } 

}