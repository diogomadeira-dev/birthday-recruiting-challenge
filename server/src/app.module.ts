import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mongo:XO4LD0Fd828LcF78@birthday-recruiting-cha.ysl1ddm.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
