import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { DocumentationService } from '../documentation/documentation.service';

export interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  budgetRange: string;
  timeline: string;
  preferredDate: string;
  preferredTime: string;
  projectDescription: string;
}

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly documentationService: DocumentationService
  ) {}

  @Post('consultation')
  async sendConsultationEmail(@Body() consultationData: ConsultationRequest) {
    return this.emailService.sendConsultationEmail(consultationData);
  }

  @Post('confirmation')
  async sendConfirmationEmail(@Body() confirmationData: { email: string; name: string }) {
    return this.emailService.sendConfirmationEmail(confirmationData.email, confirmationData.name);
  }

  @Post('newsletter')
  async subscribeNewsletter(@Body() subscriptionData: { email: string }) {
    try {
      return await this.emailService.subscribeNewsletter(subscriptionData.email);
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Invalid email format',
        email: subscriptionData.email
      };
    }
  }

  @Post('newsletter/unsubscribe')
  async unsubscribeNewsletter(@Body() unsubscribeData: { email: string }) {
    return this.emailService.unsubscribeNewsletter(unsubscribeData.email);
  }

  @Get('newsletter-stats')
  async getNewsletterStats() {
    return this.emailService.getNewsletterStats();
  }

  @Post('contact')
  async sendContactMessage(@Body() contactData: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    phone?: string; 
    subject?: string; 
    message: string 
  }) {
    try {
      return await this.emailService.sendContactMessage(contactData);
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send contact message'
      };
    }
  }

  @Get('download/:resourceId')
  async downloadResource(@Param('resourceId') resourceId: string, @Res() res: any) {
    try {
      const result = await this.documentationService.downloadResource(resourceId, res);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Download failed'
      };
    }
  }
}
