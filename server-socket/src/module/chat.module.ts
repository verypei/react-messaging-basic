/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/chat.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [ChatGateway],
    exports:[ChatGateway]
})
export class ChatModule {}
