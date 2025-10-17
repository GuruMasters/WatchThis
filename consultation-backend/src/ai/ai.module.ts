import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TranslationModule], // Import Translation servisa za prevođenje
  controllers: [AIController],
  providers: [AIService],
  exports: [AIService] // Export za korišćenje u drugim modulima
})
export class AIModule {}

