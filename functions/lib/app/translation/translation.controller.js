"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TranslationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const translation_service_1 = require("./translation.service");
class TranslateDto {
    constructor() {
        this.sourceLanguage = 'en';
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslateDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslateDto.prototype, "targetLanguage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslateDto.prototype, "sourceLanguage", void 0);
class TranslateBatchDto {
    constructor() {
        this.sourceLanguage = 'en';
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], TranslateBatchDto.prototype, "texts", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslateBatchDto.prototype, "targetLanguage", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TranslateBatchDto.prototype, "sourceLanguage", void 0);
class DetectLanguageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetectLanguageDto.prototype, "text", void 0);
let TranslationController = TranslationController_1 = class TranslationController {
    constructor(translationService) {
        this.translationService = translationService;
        this.logger = new common_1.Logger(TranslationController_1.name);
    }
    /**
     * POST /api/translation/translate
     * Prevodi tekst na ciljni jezik
     */
    async translate(translateDto) {
        this.logger.log(`Translation request: ${translateDto.text.substring(0, 50)}... to ${translateDto.targetLanguage}`);
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
    async translateBatch(batchDto) {
        this.logger.log(`Batch translation request: ${batchDto.texts.length} texts to ${batchDto.targetLanguage}`);
        const results = await this.translationService.translateBatch(batchDto.texts, batchDto.targetLanguage, batchDto.sourceLanguage || 'en');
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
    async detectLanguage(detectDto) {
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
    healthCheck() {
        return {
            success: true,
            service: 'translation',
            status: 'operational',
            timestamp: new Date().toISOString()
        };
    }
};
exports.TranslationController = TranslationController;
__decorate([
    (0, common_1.Post)('translate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TranslateDto]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "translate", null);
__decorate([
    (0, common_1.Post)('batch'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TranslateBatchDto]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "translateBatch", null);
__decorate([
    (0, common_1.Get)('languages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "getSupportedLanguages", null);
__decorate([
    (0, common_1.Post)('detect'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DetectLanguageDto]),
    __metadata("design:returntype", Promise)
], TranslationController.prototype, "detectLanguage", null);
__decorate([
    (0, common_1.Get)('cache/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranslationController.prototype, "getCacheStats", null);
__decorate([
    (0, common_1.Delete)('cache'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranslationController.prototype, "clearCache", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TranslationController.prototype, "healthCheck", null);
exports.TranslationController = TranslationController = TranslationController_1 = __decorate([
    (0, common_1.Controller)('api/translation'),
    __metadata("design:paramtypes", [translation_service_1.TranslationService])
], TranslationController);
//# sourceMappingURL=translation.controller.js.map