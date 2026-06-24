import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entites/users.entity';
import { UsersProjectsEntity } from './entites/usersProjects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService, TypeOrmModule]
})
export class UsersModule {}
