import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entites/users.entity';
import { UsersProjectsEntity } from './entites/usersProjects.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule { }
