import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID, CreateSupportRequestDto } from './dto/CreateSupportRequestDto';
import { ISupportRequestClientService } from './interfaces/service.interfaces';
import { MarkMessageAsReadDto } from './dto/MarkMessagesAsReadDto';
import { MessageDocument } from './schema/message.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schema/supportRequest.schema';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
  ) {}

  async createSupportRequest(
    data: CreateSupportRequestDto,
  ): Promise<SupportRequestDocument> {
    try {
      const request = new this.supportRequestModel(data);
      request.createdAt = new Date();
      request.isActive = true;

      return await request.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async markMessagesAsRead(params: MarkMessageAsReadDto): Promise<void> {
    (
      await this.supportRequestModel
        .findById(params.supportRequest)
        .select('-__v')
        .exec()
    ).messages
      .filter(
        (message) =>
          message.author != params.user &&
          message.sentAt < params.createdBefore,
      )
      .forEach((message) => {
        message.readAt = new Date();
        message.save();
      });
  }

  async getUnreadCount(supportRequest: ID): Promise<MessageDocument[]> {
    try {
      const request = await this.supportRequestModel.findById(supportRequest);
      const result = [];
      request.messages.map((message) => {
        if (!message.readAt) {
          result.push(message);
        }
      });
      return result || [];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
