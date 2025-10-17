import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';

@Module({
  controllers: [TranslationController],
  providers: [TranslationService],
  exports: [TranslationService] // Export servisa za korišćenje u drugim modulima
})
export class TranslationModule {}

