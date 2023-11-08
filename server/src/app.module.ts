import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mongo:XO4LD0Fd828LcF78@birthday-recruiting-cha.ysl1ddm.mongodb.net/'), CustomersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
