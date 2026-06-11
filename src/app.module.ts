import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './configDataSourse/data.source';
import { ProjectsModule } from './projects/projects.module';


@Module({
  // 1. Módulos externos que se importan, siempre mantener las import de config encima
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    // modulos que no son de configuracion
    TypeOrmModule.forRoot({...DataSourceConfig}),  // typeorm para el datasourse
    UsersModule, 
    ProjectsModule
  ], 
})

export class AppModule {}
