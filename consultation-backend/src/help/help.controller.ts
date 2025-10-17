import { Controller, Get, Query, Param } from '@nestjs/common';
import { HelpService } from './help.service';

@Controller('help')
export class HelpController {
  constructor(private readonly helpService: HelpService) {}

  @Get('search')
  async searchFaqs(@Query('q') query: string, @Query('category') category?: string) {
    try {
      const results = await this.helpService.searchFaqs(query, category);
      return {
        success: true,
        query: query,
        category: category,
        results: results,
        total: results.length
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Search failed',
        query: query,
        results: []
      };
    }
  }

  @Get('categories')
  async getFaqCategories() {
    try {
      const categories = await this.helpService.getFaqCategories();
      return {
        success: true,
        categories: categories
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to get categories',
        categories: []
      };
    }
  }

  @Get('popular')
  async getPopularFaqs(@Query('limit') limit?: string) {
    try {
      const limitNum = limit ? parseInt(limit) : 10;
      const faqs = await this.helpService.getPopularFaqs(limitNum);
      return {
        success: true,
        faqs: faqs,
        total: faqs.length
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to get popular FAQs',
        faqs: []
      };
    }
  }

  @Get('faq/:id/view')
  async trackFaqView(@Param('id') faqId: string) {
    try {
      await this.helpService.trackFaqView(faqId);
      return {
        success: true,
        message: 'FAQ view tracked'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to track view'
      };
    }
  }
}

