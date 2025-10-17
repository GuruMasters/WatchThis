import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { DocumentationModule } from './documentation/documentation.module';
import { HelpModule } from './help/help.module';
import { TranslationModule } from './translation/translation.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    // Rate limiting - 100 requests per minute by default
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
      limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    }]),
    EmailModule,
    DocumentationModule,
    HelpModule,
    TranslationModule,
    AIModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Apply rate limiting globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
