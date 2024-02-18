import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from './supportRequest.service';
import { ID } from '../chat/dto/CreateSupportRequestDto';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/guards/wsAuth.guard';
import { Roles } from '../auth/enums/enums';
import { WsExceptionFilter } from './exeption/ws.exeption.filter';
import { UserService } from '../users/users.service';
import { Role } from 'src/auth/enums/enums';
import { WsValidationPipe } from 'src/validation/validation';
import { WsRolesGuard } from 'src/auth/guards/wsRole.guard';

@WebSocketGateway({
  cookie: true,
  cors: true,
})
export class SupportGateway {
  constructor(
    private supportRequestService: SupportRequestService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseFilters(new WsExceptionFilter())
  @UseGuards(WsAuthGuard, WsRolesGuard)
  @Roles(Role.CLIENT, Role.MANAGER)
  @SubscribeMessage('connectToChat')
  async handleSubscribeToChat(
    @ConnectedSocket() client: Socket,
    @MessageBody(new WsValidationPipe()) payload: { chatId: ID },
  ) {
    return this.supportRequestService.subscribe(
      async (supportRequest, message) => {
        if (supportRequest._id === payload.chatId) {
          const { _id, sentAt, text, readAt, author } = message;
          const { id: authorId, name } =
            await this.userService.findById(author);
          const result = {
            _id,
            sentAt,
            text,
            readAt,
            author: {
              id: authorId,
              name: name,
            },
          };
          client.emit('connectToChat', result);
        }
      },
    );
  }
}
