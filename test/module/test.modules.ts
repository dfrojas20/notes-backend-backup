import { Module, forwardRef } from '@nestjs/common';
import { crearNotatest } from 'test/ObjectMother/Nota/crearNotaTest';
import { NotaModule } from 'src/modulos/nota.module';
import { CarpetaModule } from 'src/modulos/carpeta.module';
import { SuscripcionModule } from 'src/modulos/suscripcion.module';
import { UsuarioModule } from 'src/modulos/usuario.module';
import { EtiquetaModule } from 'src/modulos/etiqueta.module';
import { CrearCarpetaTest } from 'test/ObjectMother/Carpeta/CrearCarpetaTest';

@Module({
  imports: [
    forwardRef(() => NotaModule),
    forwardRef(() => CarpetaModule),
    forwardRef(() => SuscripcionModule),
    forwardRef(() => UsuarioModule),
    forwardRef(() => EtiquetaModule),
  ], // Importa tus módulos aquí
  providers: [
    crearNotatest,CrearCarpetaTest,
  ],
  exports: [crearNotatest,CrearCarpetaTest],
})
export class TestModule {}