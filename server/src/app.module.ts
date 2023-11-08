import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mongo:XO4LD0Fd828LcF78@birthday-recruiting-cha.ysl1ddm.mongodb.net/'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
