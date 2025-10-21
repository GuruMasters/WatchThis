import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  HttpCode, 
  HttpStatus,
  Logger,
  Delete
} from '@nestjs/common';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { TranslationService, TranslationResponse } from './translation.service';

class TranslateDto {
  @IsString()
  text: string;

  @IsString()
  targetLanguage: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string = 'en';
}

class TranslateBatchDto {
  @IsArray()
  @IsString({ each: true })
  texts: string[];

  @IsString()
  targetLanguage: string;

  @IsOptional()
  @IsString()
  sourceLanguage?: string = 'en';
}

class DetectLanguageDto {
  @IsString()
  text: string;
}

@Controller('api/translation')
export class TranslationController {
  private readonly logger = new Logger(TranslationController.name);

  constructor(private readonly translationService: TranslationService) {}

  /**
   * POST /api/translation/translate
   * Prevodi tekst na ciljni jezik
   */
  @Post('translate')
  @HttpCode(HttpStatus.OK)
  async translate(@Body() translateDto: TranslateDto): Promise<{ success: boolean; data: TranslationResponse }> {
    this.logger.log(
      `Translation request: ${translateDto.text.substring(0, 50)}... to ${translateDto.targetLanguage}`
    );

    const result = await this.translationService.translateText({
      text: translateDto.text,
      targetLanguage: translateDto.targetLanguage,
      sourceLanguage: translateDto.sourceLanguage || 'en'
    });

    return {
      success: true,
      data: result
    };
  }

  /**
   * POST /api/translation/batch
   * Prevodi više tekstova odjednom
   */
  @Post('batch')
  @HttpCode(HttpStatus.OK)
  async translateBatch(@Body() batchDto: TranslateBatchDto): Promise<{ success: boolean; data: TranslationResponse[]; count: number }> {
    this.logger.log(
      `Batch translation request: ${batchDto.texts.length} texts to ${batchDto.targetLanguage}`
    );

    const results = await this.translationService.translateBatch(
      batchDto.texts,
      batchDto.targetLanguage,
      batchDto.sourceLanguage || 'en'
    );

    return {
      success: true,
      data: results,
      count: results.length
    };
  }

  /**
   * GET /api/translation/languages
   * Vraća listu podržanih jezika
   */
  @Get('languages')
  async getSupportedLanguages() {
    this.logger.log('Fetching supported languages');

    const languages = await this.translationService.getSupportedLanguages();

    return {
      success: true,
      data: languages,
      count: languages.length
    };
  }

  /**
   * POST /api/translation/detect
   * Detektuje jezik teksta
   */
  @Post('detect')
  @HttpCode(HttpStatus.OK)
  async detectLanguage(@Body() detectDto: DetectLanguageDto) {
    this.logger.log(`Language detection request for: ${detectDto.text.substring(0, 50)}...`);

    const result = await this.translationService.detectLanguage(detectDto.text);

    return {
      success: true,
      data: result
    };
  }

  /**
   * GET /api/translation/cache/stats
   * Vraća statistiku keša
   */
  @Get('cache/stats')
  getCacheStats() {
    const stats = this.translationService.getCacheStats();

    return {
      success: true,
      data: stats
    };
  }

  /**
   * DELETE /api/translation/cache
   * Čisti keš prevoda
   */
  @Delete('cache')
  @HttpCode(HttpStatus.OK)
  clearCache() {
    this.logger.log('Clearing translation cache');
    this.translationService.clearCache();

    return {
      success: true,
      message: 'Translation cache cleared successfully'
    };
  }

  /**
   * GET /api/translation/health
   * Provera zdravlja servisa
   */
  @Get('health')
  healthCheck() {
    return {
      success: true,
      service: 'translation',
      status: 'operational',
      timestamp: new Date().toISOString()
    };
  }
}

