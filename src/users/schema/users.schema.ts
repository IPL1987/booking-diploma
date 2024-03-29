import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserModel = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  public email: string;

  @Prop({ unique: true, required: true })
  public passwordHash: string;

  @Prop({ required: true })
  public name: string;

  @Prop()
  public contactPhone?: string;

  @Prop({
    required: true,
    default: 'client',
    role: 'client' || 'admin' || 'manager',
  })
  static role: string;

  @Prop({ required: true })
  public id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
