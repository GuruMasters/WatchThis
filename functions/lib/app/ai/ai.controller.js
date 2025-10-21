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
var AIController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ai_service_1 = require("./ai.service");
class ConversationMessageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConversationMessageDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConversationMessageDto.prototype, "content", void 0);
class ChatRequestDto {
    constructor() {
        this.language = 'en';
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatRequestDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatRequestDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatRequestDto.prototype, "context", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ConversationMessageDto),
    __metadata("design:type", Array)
], ChatRequestDto.prototype, "conversationHistory", void 0);
let AIController = AIController_1 = class AIController {
    constructor(aiService) {
        this.aiService = aiService;
        this.logger = new common_1.Logger(AIController_1.name);
    }
    /**
     * POST /api/ai/chat
     * Generiše AI odgovor na korisničku poruku
     */
    async chat(chatRequest) {
        this.logger.log(`AI chat request: "${chatRequest.message.substring(0, 50)}..." in language: ${chatRequest.language || 'en'}`);
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
    async submitBooking(bookingData) {
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
    async healthCheck() {
        const health = await this.aiService.healthCheck();
        return {
            success: true,
            data: health
        };
    }
};
exports.AIController = AIController;
__decorate([
    (0, common_1.Post)('chat'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChatRequestDto]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "chat", null);
__decorate([
    (0, common_1.Get)('info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AIController.prototype, "getServiceInfo", null);
__decorate([
    (0, common_1.Post)('submit-booking'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "submitBooking", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AIController.prototype, "healthCheck", null);
exports.AIController = AIController = AIController_1 = __decorate([
    (0, common_1.Controller)('api/ai'),
    __metadata("design:paramtypes", [ai_service_1.AIService])
], AIController);
//# sourceMappingURL=ai.controller.js.map