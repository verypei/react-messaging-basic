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
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({cors:true})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ER_CMS_SEND')
  handleEventFromEr(@MessageBody() data:any) {
    console.log(data.receiver,"---data receiver---");
      this.server.emit(`${data.receiver}`, data);
  }

  @SubscribeMessage('PH_CMS_SEND')
  handleEventFromPh(@MessageBody() data:any) {
    this.server.emit(`${data.receiver}`, data);
  }

  @SubscribeMessage('LAB_CMS_SEND')
  handleEventFromLab(@MessageBody() data:any) {
    console.log(data,"---data from lab");
    this.server.emit(`${data.receiver}`, data);
  }

  @SubscribeMessage('POLY_CMS_SEND')
  handleEventFromPoly(@MessageBody() data:any) {
    console.log(data,"---data from lab");
    this.server.emit(`${data.receiver}`, data);
  }

  @SubscribeMessage('GENERAL')
  handleEventGeneral(@MessageBody() data:any) {
    console.log(data,"---data from lab");
    this.server.emit(`GENERAL`, data);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected------');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected===');
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
