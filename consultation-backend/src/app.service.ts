import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Consultation Backend (NestJS) is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      framework: 'NestJS',
    };
  }

  getHealth(): object {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }
}
