import { NestFactory } from '@nestjs/core';
import { ServerModule } from './server.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(ServerModule);
    await app.listen(3000);
    Logger.verbose('server started on port 3000');
}

bootstrap();
