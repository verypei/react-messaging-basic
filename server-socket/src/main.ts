import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002,()=>{
    console.log('================================== SERVER ON 3002 ==================================');
    
  });
}
bootstrap();
