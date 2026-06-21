import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UsersEntity } from './entites/users.entity';
import { UsersProjectsEntity } from './entites/usersProyects.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
