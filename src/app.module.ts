import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import "reflect-metadata";

@Module({
  // 1. Módulos externos que se importan, siempre mantener las import de config encima
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    // modulos que no son de configuracion
    UsersModule
  ], 
})

export class AppModule {}
