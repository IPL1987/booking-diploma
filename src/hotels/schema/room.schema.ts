import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Hotel } from '../schema/hotel.schema';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: Hotel;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({
    type: Date,
    default: new Date(),
    required: true,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: new Date(),
    required: true,
  })
  updatedAt: Date;

  @Prop({
    type: Boolean,
    default: true,
  })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
