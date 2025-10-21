import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { DocumentationModule } from '../documentation/documentation.module';

@Module({
  imports: [DocumentationModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
