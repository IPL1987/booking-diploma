import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from '../hotels/hotels.service';
import { IHotelRoomService } from '../hotels/room.service';
import { HotelsController } from '../hotels/hotels.controller';
import { Hotel, HotelSchema } from '../hotels/schema/hotel.schema';
import { HotelRoom, HotelRoomSchema } from '../hotels/schema/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelsController],
  providers: [HotelService, IHotelRoomService],
  exports: [HotelService, IHotelRoomService],
})
export class HotelModule {}
