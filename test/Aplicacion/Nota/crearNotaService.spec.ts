import { CrearNotaService } from "src/nota/aplicacion/CrearNotaService";
import { CrearNotaDto } from "src/nota/aplicacion/DataTransferObjects/CrearNotaDto";
import { Nota } from "src/nota/dominio/Nota";
import { Either } from "src/utilidad/Either";
import { crearNotatest } from "test/ObjectMother/Nota/crearNotaTest";

describe('CrearNotaService', () => {
    test('test_create_note', async () => {
      //Arrange
      const crearNotaService: CrearNotaService =
      crearNotatest.crearNotaService();
      const dto: CrearNotaDto = crearNotatest.crearNotaTestValid();
  
      //Act
      const result: Either<Error, Nota> = await crearNotaService.execute(dto);
  
      //Assert
      expect(result.isRight()).toBeTruthy();
    });

});