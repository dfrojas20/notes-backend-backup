import { CrearEtiquetaDto } from "src/etiqueta/aplicacion/Dto/CrearEtiquetaDto";
import { MockRepositorioEtiqueta } from "../mocks/mockRepositorioEtiqueta";

export class CrearCarpetaTest{

    public static CrearEtiquetaTestValid(): CrearEtiquetaDto{
        let etiqueta = new CrearEtiquetaDto();
        etiqueta.nombreEtiqueta = "Etiqueta de prueba";
        etiqueta.idUsuario = "1";
        return etiqueta;
    }

    public static CrearCarpetaTestNoValid(): CrearEtiquetaDto{
        let etiqueta = new CrearEtiquetaDto();
        etiqueta.nombreEtiqueta = "Etiqueta de prueba";
        etiqueta.idUsuario = "";
        return etiqueta;
    }

    // public static crearEtiquetaService(){
    //     const mock = new MockRepositorioEtiqueta();
    //     return new crearEtiquetaService(mock);
    // } 

}