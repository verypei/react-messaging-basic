import { ChatGateway } from './../chat.gateway';
import { ChatModule } from './chat.module';
import { Module } from '@nestjs/common';
@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
