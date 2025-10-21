import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  HttpCode, 
  HttpStatus,
  Logger 
} from '@nestjs/common';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AIService, AIRequest, AIResponse } from './ai.service';

class ConversationMessageDto {
  @IsString()
  role: 'user' | 'ai';

  @IsString()
  content: string;
}

class ChatRequestDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  language?: string = 'en';

  @IsOptional()
  @IsString()
  context?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessageDto)
  conversationHistory?: ConversationMessageDto[];
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
  async chat(@Body() chatRequest: ChatRequestDto): Promise<{ success: boolean; data: AIResponse }> {
    this.logger.log(
      `AI chat request: "${chatRequest.message.substring(0, 50)}..." in language: ${chatRequest.language || 'en'}`
    );

    const result = await this.aiService.generateResponse({
      message: chatRequest.message,
      language: chatRequest.language || 'en',
      context: chatRequest.context
    });

    return {
      success: true,
      data: result
    };
  }

  /**
   * GET /api/ai/info
   * Vraća informacije o AI servisu
   */
  @Get('info')
  getServiceInfo() {
    const info = this.aiService.getServiceInfo();

    return {
      success: true,
      data: info
    };
  }

  /**
   * POST /api/ai/submit-booking
   * Submits a booking collected by AI
   */
  @Post('submit-booking')
  @HttpCode(HttpStatus.OK)
  async submitBooking(@Body() bookingData: any) {
    this.logger.log(`AI booking submission for: ${bookingData.email}`);

    // Here you would normally save to database
    // For now, just return success
    return {
      success: true,
      data: {
        message: 'Booking submitted successfully',
        bookingData
      }
    };
  }

  /**
   * GET /api/ai/health
   * Health check za AI servis
   */
  @Get('health')
  async healthCheck() {
    const health = await this.aiService.healthCheck();

    return {
      success: true,
      data: health
    };
  }
}
