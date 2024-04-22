import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuscarCarpetaPorIdService } from "src/carpeta/aplicacion/BuscarCarpetaPorIdService";
import { BuscarCarpetasPorUsuarioService } from "src/carpeta/aplicacion/BuscarCarpetasPorUsuarioService";
import { BuscarCarpetasService } from "src/carpeta/aplicacion/BuscarCarpetasService";
import { CrearCarpetaService } from "src/carpeta/aplicacion/CrearCarpetaService";
import { EliminarCarpetaService } from "src/carpeta/aplicacion/EliminarCarpetaService";
import { ModificarCarpetaService } from "src/carpeta/aplicacion/ModificarCarpetaService";
import { CarpetaController } from "src/carpeta/infraestructura/Controller/CarpetaController";
import { CarpetaEntity } from "src/carpeta/infraestructura/Entity/CarpetaEntity";
import { CarpetaRepositorioAdaptador } from "src/carpeta/infraestructura/Repositorio/CarpetaRepositorioAdaptador";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";
import { LogEntity } from "src/core/infraestructura/LogEntity";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { NotaEntity } from "src/nota/infraestructura/Entity/NotaEntity";
import { UsuarioController } from "src/usuario/infraestructura/Controller/UsuarioController";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";

@Module({
    imports: [TypeOrmModule.forFeature([CarpetaEntity,UsuarioEntity,NotaEntity,LogEntity])],
    providers: [CrearCarpetaService,ModificarCarpetaService,EliminarCarpetaService,BuscarCarpetasService,BuscarCarpetaPorIdService,BuscarCarpetasPorUsuarioService,
              CarpetaRepositorioAdaptador,LoggerDecorator,LoggerImplementation,
    {
      provide: 'CarpetaRepositorio',
      useClass: CarpetaRepositorioAdaptador
    }],
    controllers: [CarpetaController]
  })
  export class CarpetaModule {}