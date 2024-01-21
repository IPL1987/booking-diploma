import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HotelsController } from './hotels/hotels.controller';
import { HotelsService } from './hotels/hotels.service';
import { HotelsModule } from './hotels/hotels.module';
import { ChatModule } from './chat/chat.module';
import { ReservationService } from './reservation/reservation.service';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/1'),
    AuthModule,
    HotelsModule,
    ChatModule,
    ReservationModule,
  ],
  controllers: [AppController, HotelsController, ReservationController],
  providers: [AppService, HotelsService, ReservationService],
})
export class AppModule {}
