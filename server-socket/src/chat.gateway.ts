/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({cors:true})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
num = 1
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events_sender')
  handleEvent(@MessageBody() data:any) {
    console.log(data,"--data from sender--",data.sender);
    this.server.emit('events_re', data);
    // this.handleDisconnect()
  }

  handleConnection(client: any, ...args: any[]) {
    this.num++
    console.log('User connected------',this.num);
  }

  handleDisconnect(client: any) {
    console.log('User disconnected===');
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
