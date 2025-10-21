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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const documentation_service_1 = require("../documentation/documentation.service");
let EmailController = class EmailController {
    constructor(emailService, documentationService) {
        this.emailService = emailService;
        this.documentationService = documentationService;
    }
    async sendConsultationEmail(consultationData) {
        return this.emailService.sendConsultationEmail(consultationData);
    }
    async sendConfirmationEmail(confirmationData) {
        return this.emailService.sendConfirmationEmail(confirmationData.email, confirmationData.name);
    }
    async subscribeNewsletter(subscriptionData) {
        try {
            return await this.emailService.subscribeNewsletter(subscriptionData.email);
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Invalid email format',
                email: subscriptionData.email
            };
        }
    }
    async unsubscribeNewsletter(unsubscribeData) {
        return this.emailService.unsubscribeNewsletter(unsubscribeData.email);
    }
    async getNewsletterStats() {
        return this.emailService.getNewsletterStats();
    }
    async sendContactMessage(contactData) {
        try {
            return await this.emailService.sendContactMessage(contactData);
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to send contact message'
            };
        }
    }
    async downloadResource(resourceId, res) {
        try {
            const result = await this.documentationService.downloadResource(resourceId, res);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Download failed'
            };
        }
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('consultation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendConsultationEmail", null);
__decorate([
    (0, common_1.Post)('confirmation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendConfirmationEmail", null);
__decorate([
    (0, common_1.Post)('newsletter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "subscribeNewsletter", null);
__decorate([
    (0, common_1.Post)('newsletter/unsubscribe'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "unsubscribeNewsletter", null);
__decorate([
    (0, common_1.Get)('newsletter-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getNewsletterStats", null);
__decorate([
    (0, common_1.Post)('contact'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendContactMessage", null);
__decorate([
    (0, common_1.Get)('download/:resourceId'),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "downloadResource", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        documentation_service_1.DocumentationService])
], EmailController);
//# sourceMappingURL=email.controller.js.map