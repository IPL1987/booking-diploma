import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotels/hotels.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    ReservationModule,
    HotelModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
