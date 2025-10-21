import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class DocumentationService {
  private readonly logger = new Logger(DocumentationService.name);

  constructor() {
    this.logger.log('Initializing documentation service...');
  }

  async downloadResource(resourceId: string, res: Response): Promise<any> {
    try {
      this.logger.log(`Download request for resource: ${resourceId}`);

      // Map resource IDs to actual file paths
      const resourceMap: { [key: string]: { filename: string; filepath: string; contentType: string } } = {
        'getting-started': {
          filename: 'getting-started-guide.pdf',
          filepath: path.join(process.cwd(), 'public/docs/getting-started.pdf'),
          contentType: 'application/pdf'
        },
        'process-optimization': {
          filename: 'business-process-optimization-guide.pdf',
          filepath: path.join(process.cwd(), 'public/docs/process-optimization.pdf'),
          contentType: 'application/pdf'
        },
        'security-checklist': {
          filename: 'security-implementation-checklist.pdf',
          filepath: path.join(process.cwd(), 'public/docs/security-checklist.pdf'),
          contentType: 'application/pdf'
        },
        'api-reference': {
          filename: 'api-reference-guide.pdf',
          filepath: path.join(process.cwd(), 'public/docs/api-reference.pdf'),
          contentType: 'application/pdf'
        },
        'digital-marketing': {
          filename: 'digital-marketing-best-practices.pdf',
          filepath: path.join(process.cwd(), 'public/docs/digital-marketing.pdf'),
          contentType: 'application/pdf'
        }
      };

      const resource = resourceMap[resourceId];

      if (!resource) {
        throw new Error(`Resource not found: ${resourceId}`);
      }

      // Check if file exists
      if (!fs.existsSync(resource.filepath)) {
        this.logger.warn(`File not found: ${resource.filepath}`);
        throw new Error(`File not found: ${resource.filename}`);
      }

      // Track download
      await this.trackDownload(resourceId);

      // Set headers for download
      res.setHeader('Content-Type', resource.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${resource.filename}"`);
      res.setHeader('Cache-Control', 'public, max-age=3600');

      // Stream the file
      const fileStream = fs.createReadStream(resource.filepath);
      fileStream.pipe(res);

      return {
        success: true,
        message: `Downloading ${resource.filename}`,
        filename: resource.filename
      };

    } catch (error) {
      this.logger.error('Download error:', error);
      throw error;
    }
  }

  private async trackDownload(resourceId: string): Promise<void> {
    try {
      // Track download statistics in Firestore
      const admin = require('firebase-admin');
      const db = admin.firestore();

      await db.collection('resource_downloads').add({
        resourceId: resourceId,
        timestamp: new Date(),
        userAgent: 'unknown', // Could be enhanced with actual user tracking
        ipAddress: 'unknown'  // Could be enhanced with actual IP tracking
      });

      this.logger.log(`Download tracked for resource: ${resourceId}`);
    } catch (error) {
      this.logger.error('Failed to track download:', error);
      // Don't throw - tracking failure shouldn't break download
    }
  }

  async getResourceStats(): Promise<any> {
    try {
      const admin = require('firebase-admin');
      const db = admin.firestore();

      const downloadsRef = db.collection('resource_downloads');
      const snapshot = await downloadsRef.get();

      const stats = {
        totalDownloads: snapshot.size,
        resources: {} as { [key: string]: number }
      };

      snapshot.forEach(doc => {
        const data = doc.data();
        const resourceId = data.resourceId;
        if (stats.resources[resourceId]) {
          stats.resources[resourceId]++;
        } else {
          stats.resources[resourceId] = 1;
        }
      });

      return {
        success: true,
        stats: stats
      };

    } catch (error) {
      this.logger.error('Failed to get resource stats:', error);
      throw error;
    }
  }
}
