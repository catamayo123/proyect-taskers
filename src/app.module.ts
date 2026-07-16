import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import "reflect-metadata";
import { AuthModule } from './auth/auth.module';
import { DataSourceConfig } from './config/data.source';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';



@Module({
  // 1. Módulos externos que se importan, siempre mantener las import de config encima
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    // modulos que no son de configuracion
    TypeOrmModule.forRoot({ ...DataSourceConfig }),  // typeorm para el datasourse
    UsersModule,
    AuthModule,
    ProjectsModule,

  ]
})

export class AppModule { }
