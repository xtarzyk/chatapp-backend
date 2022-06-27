import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat';


@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
