import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IHotel = Hotel & Document;

@Schema()
export class Hotel extends Document {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop({ required: true, default: new Date().toISOString() })
  public createdAt: Date;

  @Prop({ required: true, default: new Date().toISOString() })
  public updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
