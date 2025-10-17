import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  HttpCode, 
  HttpStatus,
  Logger
} from '@nestjs/common';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { AIService, AIRequest, AIResponse } from './ai.service';

class ChatDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  language?: string = 'en';

  @IsOptional()
  @IsString()
  context?: string;
}

class AIBookingDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  timeline?: string;

  @IsOptional()
  @IsString()
  preferredDate?: string;

  @IsOptional()
  @IsString()
  preferredTime?: string;

  @IsOptional()
  @IsString()
  projectDescription?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  message?: string;
}

@Controller('api/ai')
export class AIController {
  private readonly logger = new Logger(AIController.name);

  constructor(private readonly aiService: AIService) {}

  /**
   * POST /api/ai/chat
   * Generiše AI odgovor na korisničku poruku
   */
  @Post('chat')
  @HttpCode(HttpStatus.OK)
  async chat(@Body() chatDto: ChatDto): Promise<{ success: boolean; data: AIResponse }> {
    this.logger.log(
      `AI chat request: "${chatDto.message.substring(0, 50)}..." in language: ${chatDto.language || 'en'}`
    );

    const response = await this.aiService.generateResponse({
      message: chatDto.message,
      language: chatDto.language || 'en',
      context: chatDto.context
    });

    return {
      success: true,
      data: response
    };
  }

  /**
   * GET /api/ai/info
   * Vraća informacije o AI servisu
   */
  @Get('info')
  getInfo() {
    const info = this.aiService.getServiceInfo();

    return {
      success: true,
      data: info
    };
  }

  /**
   * GET /api/ai/health
   * Provera zdravlja AI servisa
   */
  @Get('health')
  async healthCheck() {
    const health = await this.aiService.healthCheck();

    return {
      success: true,
      service: 'ai',
      ...health,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * POST /api/ai/submit-booking
   * Automatski submituje booking/contact formu sa AI-prikupljenim podacima
   */
  @Post('submit-booking')
  @HttpCode(HttpStatus.OK)
  async submitAIBooking(@Body() bookingDto: AIBookingDto): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      this.logger.log(`AI booking submission for: ${bookingDto.email}`);

      // Validate required fields
      if (!bookingDto.email || !bookingDto.firstName) {
        return {
          success: false,
          error: 'Email and first name are required'
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.\w+$/;
      if (!emailRegex.test(bookingDto.email)) {
        return {
          success: false,
          error: 'Invalid email format'
        };
      }

      // Save booking/contact to Firebase via email service
      const { EmailService } = await import('../email/email.service');
      const emailService = new EmailService();

      // Determine if it's a booking or contact request
      const isBooking = bookingDto.service || bookingDto.preferredDate;
      
      if (isBooking) {
        // Handle as booking request
        const result = await emailService.sendContactMessage({
          firstName: bookingDto.firstName,
          lastName: bookingDto.lastName || '',
          email: bookingDto.email,
          phone: bookingDto.phone || '',
          subject: `AI Booking: ${bookingDto.service || 'Consultation'}`,
          message: `
Service: ${bookingDto.service || 'General consultation'}
Budget: ${bookingDto.budget || 'Not specified'}
Timeline: ${bookingDto.timeline || 'Not specified'}
Preferred Date: ${bookingDto.preferredDate || 'Not specified'}
Preferred Time: ${bookingDto.preferredTime || 'Not specified'}

Project Description:
${bookingDto.projectDescription || 'Not provided'}

📱 This booking was created via AI Chat Assistant
          `.trim()
        });

        this.logger.log(`AI booking saved successfully`);

        return {
          success: true,
          data: {
            message: 'Your booking request has been submitted successfully! We will contact you within 24 hours.',
            type: 'booking',
            contactId: result.contactId
          }
        };
      } else {
        // Handle as contact request
        const result = await emailService.sendContactMessage({
          firstName: bookingDto.firstName,
          lastName: bookingDto.lastName || '',
          email: bookingDto.email,
          phone: bookingDto.phone || '',
          subject: bookingDto.subject || 'General Inquiry (via AI Chat)',
          message: bookingDto.message || bookingDto.projectDescription || 'No message provided'
        });

        this.logger.log(`AI contact message saved successfully`);

        return {
          success: true,
          data: {
            message: 'Your message has been sent successfully! We will respond shortly.',
            type: 'contact',
            contactId: result.contactId
          }
        };
      }
    } catch (error) {
      this.logger.error(`AI booking submission failed: ${error.message}`, error.stack);
      return {
        success: false,
        error: error.message || 'Failed to submit your request. Please try again.'
      };
    }
  }
}

