import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerDecorator } from "src/core/aplicacion/LoggerDecorator";
import { LogEntity } from "src/core/infraestructura/LogEntity";
import { LoggerImplementation } from "src/core/infraestructura/LoggerImplementation";
import { BuscarSuscripcionPorId } from "src/suscripcion/aplicacion/BuscarSuscripcionService";
import { BuscarSuscripcionUsuarioService } from "src/suscripcion/aplicacion/BuscarSuscripcionUsuarioService";
import { BuscarSuscripcionesService } from "src/suscripcion/aplicacion/BuscarSuscripcionesService";
import { CrearSuscripcionService } from "src/suscripcion/aplicacion/CrearSuscripcionService";
import { EliminarSuscripcionService } from "src/suscripcion/aplicacion/EliminarSuscripcionService";
import { ModificarSuscripcionService } from "src/suscripcion/aplicacion/ModificarSuscripcionService";
import { SuscripcionController } from "src/suscripcion/infraestructura/Controller/SuscripcionController";
import { SuscripcionEntity } from "src/suscripcion/infraestructura/Entity/SuscripcionEntity";
import { RepositorioSuscripcionAdaptador } from "src/suscripcion/infraestructura/Repositorio/RepositorioSuscripcionAdaptador";
import { UsuarioEntity } from "src/usuario/infraestructura/Entity/UsuarioEntity";

@Module({
    imports: [TypeOrmModule.forFeature([SuscripcionEntity,UsuarioEntity,LogEntity])],
    providers: [CrearSuscripcionService,ModificarSuscripcionService,EliminarSuscripcionService,BuscarSuscripcionesService,
      BuscarSuscripcionPorId,BuscarSuscripcionUsuarioService,RepositorioSuscripcionAdaptador,LoggerDecorator,LoggerImplementation,
    {
      provide: 'SuscripcionRepositorio',
      useClass: RepositorioSuscripcionAdaptador
    }],
    controllers: [SuscripcionController]
  })
  export class SuscripcionModule {}