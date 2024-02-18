import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schema/supportRequest.schema';
import { Model } from 'mongoose';
import { ISupportRequestService } from './interfaces/service.interfaces';
import { GetChatListParams } from './dto/GetChatListParams';
import { ID, SendMessageDto } from './dto/SendMessageDto';
import { Message, MessageDocument } from './schema/message.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    readonly supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name) readonly messageModel: Model<MessageDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findSupportRequests(
    params: GetChatListParams,
  ): Promise<SupportRequestDocument[]> {
    try {
      return await this.supportRequestModel.find(params).select('-__v').exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async sendMessage(data: SendMessageDto) {
    try {
      const { author, supportRequest, text } = data;
      const requestModel =
        await this.supportRequestModel.findById(supportRequest);
      const message = new this.messageModel({
        author,
        text,
      });

      await message.save();
      requestModel.messages.push(message);

      await requestModel.save();
      this.eventEmitter.emit('sendMessage', supportRequest, message);

      return message;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getMessages(supportRequest: ID): Promise<MessageDocument[]> {
    try {
      return (
        (
          await this.supportRequestModel
            .findById(supportRequest)
            .select('-__v')
            .exec()
        ).messages || []
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    try {
      this.eventEmitter.on('newMessage', ({ supportRequest, message }) => {
        handler(supportRequest, message);
      });
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
