import { Module } from '@nestjs/common';
import { SupportRequestService } from './supportRequest.service';
import { SupportRequestClientService } from './supportRequestClientService';
import { SupportRequestEmployeeService } from './supportRequestEmployeeService';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schema/supportRequest.schema';
import { Message, MessageSchema } from './schema/message.schema';
import { SupportRequestController } from './support.controller';
import { SupportGateway } from './support.gateway';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UserModule,
  ],
  controllers: [SupportRequestController],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
    SupportGateway,
  ],
})
export class SupportModule {}
