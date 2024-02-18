import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelModule } from './hotels/hotels.module';
import { SupportModule } from './chat/support.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ReservationModule } from './reservation/reservation.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseConfigService } from './config/mongoose-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    ReservationModule,
    HotelModule,
    SupportModule,
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
