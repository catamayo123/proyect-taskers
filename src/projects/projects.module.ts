import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entites/projects.entity';
import { UsersProjectsEntity } from 'src/users/entites/usersProyects.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity])
    ],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
