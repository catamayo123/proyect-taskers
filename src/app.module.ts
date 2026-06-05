import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule], // 1. Módulos externos que se importan
})

export class AppModule {}
