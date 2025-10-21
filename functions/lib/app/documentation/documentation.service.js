"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DocumentationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let DocumentationService = DocumentationService_1 = class DocumentationService {
    constructor() {
        this.logger = new common_1.Logger(DocumentationService_1.name);
        this.logger.log('Initializing documentation service...');
    }
    async downloadResource(resourceId, res) {
        try {
            this.logger.log(`Download request for resource: ${resourceId}`);
            // Map resource IDs to actual file paths
            const resourceMap = {
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
        }
        catch (error) {
            this.logger.error('Download error:', error);
            throw error;
        }
    }
    async trackDownload(resourceId) {
        try {
            // Track download statistics in Firestore
            const admin = require('firebase-admin');
            const db = admin.firestore();
            await db.collection('resource_downloads').add({
                resourceId: resourceId,
                timestamp: new Date(),
                userAgent: 'unknown', // Could be enhanced with actual user tracking
                ipAddress: 'unknown' // Could be enhanced with actual IP tracking
            });
            this.logger.log(`Download tracked for resource: ${resourceId}`);
        }
        catch (error) {
            this.logger.error('Failed to track download:', error);
            // Don't throw - tracking failure shouldn't break download
        }
    }
    async getResourceStats() {
        try {
            const admin = require('firebase-admin');
            const db = admin.firestore();
            const downloadsRef = db.collection('resource_downloads');
            const snapshot = await downloadsRef.get();
            const stats = {
                totalDownloads: snapshot.size,
                resources: {}
            };
            snapshot.forEach(doc => {
                const data = doc.data();
                const resourceId = data.resourceId;
                if (stats.resources[resourceId]) {
                    stats.resources[resourceId]++;
                }
                else {
                    stats.resources[resourceId] = 1;
                }
            });
            return {
                success: true,
                stats: stats
            };
        }
        catch (error) {
            this.logger.error('Failed to get resource stats:', error);
            throw error;
        }
    }
};
exports.DocumentationService = DocumentationService;
exports.DocumentationService = DocumentationService = DocumentationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DocumentationService);
//# sourceMappingURL=documentation.service.js.map