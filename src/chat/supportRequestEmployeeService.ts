import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ID } from './dto/CreateSupportRequestDto';
import { ISupportRequestEmployeeService } from './interfaces/service.interfaces';
import { MarkMessageAsReadDto } from './dto/MarkMessagesAsReadDto';
import { Message } from './schema/message.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schema/supportRequest.schema';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
  ) {}

  async getUnreadCount(supportRequest: ID): Promise<Message[]> {
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

  async closeRequest(supportRequest: ID): Promise<void> {
    return await this.supportRequestModel.findByIdAndUpdate(supportRequest, {
      isActive: false,
    });
  }
}
