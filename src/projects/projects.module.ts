import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProjectsEntity } from '../users/entites/usersProjects.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsEntity } from './entites/projects.entity';
import { ProjectsService } from './services/projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity])
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule { }
