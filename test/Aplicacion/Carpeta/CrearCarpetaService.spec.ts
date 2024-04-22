import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { CrearCarpetaDto } from "src/carpeta/aplicacion/DataTransferObjects/CrearCarpetaDto";
import { Carpeta } from "src/carpeta/dominio/Carpeta";
import { Either } from "src/utilidad/Either";
import { CrearCarpetaTest } from "test/ObjectMother/Carpeta/CrearCarpetaTest";

describe('CrearCarpetaService', () => {
    test('test_create_folder', async () => {
      //Arrange
      const crearCarpetaService: CrearCarpetaService = CrearCarpetaTest.crearCarpetaService();

      const dto: CrearCarpetaDto = CrearCarpetaTest.CrearCarpetaTestValid();
  
      //Act
      const result: Either<Error, Carpeta> = await crearCarpetaService.execute(dto);
  
      //Assert
      expect(result.isRight()).toBeTruthy();
    });

});