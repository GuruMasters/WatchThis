import { Controller, Get, Param, Res } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { Response } from 'express';

@Controller('documentation')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Get('download/:resourceId')
  async downloadResource(@Param('resourceId') resourceId: string, @Res() res: Response) {
    try {
      return await this.documentationService.downloadResource(resourceId, res);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message || 'Resource not found'
      });
    }
  }

  @Get('stats')
  async getResourceStats() {
    return this.documentationService.getResourceStats();
  }
}

