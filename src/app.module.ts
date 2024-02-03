import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HotelsController } from './hotels/hotels.controller';
import { HotelModule } from './hotels/hotels.module';
import { ReservationService } from './reservation/reservation.service';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationModule } from './reservation/reservation.module';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    AuthModule,
    HotelModule,
    ChatModule,
    ReservationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController, HotelsController, ReservationController],
  providers: [AppService, ReservationService],
})
export class AppModule {}
