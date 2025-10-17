import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { StripeService } from './stripe.service';

@Module({
  providers: [GoogleCalendarService, StripeService],
  exports: [GoogleCalendarService, StripeService],
})
export class IntegrationsModule {}
