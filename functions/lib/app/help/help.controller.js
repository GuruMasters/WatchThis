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
exports.HelpController = void 0;
const common_1 = require("@nestjs/common");
const help_service_1 = require("./help.service");
let HelpController = class HelpController {
    constructor(helpService) {
        this.helpService = helpService;
    }
    async searchFaqs(query, category) {
        try {
            const results = await this.helpService.searchFaqs(query, category);
            return {
                success: true,
                query: query,
                category: category,
                results: results,
                total: results.length
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Search failed',
                query: query,
                results: []
            };
        }
    }
    async getFaqCategories() {
        try {
            const categories = await this.helpService.getFaqCategories();
            return {
                success: true,
                categories: categories
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to get categories',
                categories: []
            };
        }
    }
    async getPopularFaqs(limit) {
        try {
            const limitNum = limit ? parseInt(limit) : 10;
            const faqs = await this.helpService.getPopularFaqs(limitNum);
            return {
                success: true,
                faqs: faqs,
                total: faqs.length
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to get popular FAQs',
                faqs: []
            };
        }
    }
    async trackFaqView(faqId) {
        try {
            await this.helpService.trackFaqView(faqId);
            return {
                success: true,
                message: 'FAQ view tracked'
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to track view'
            };
        }
    }
};
exports.HelpController = HelpController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HelpController.prototype, "searchFaqs", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelpController.prototype, "getFaqCategories", null);
__decorate([
    (0, common_1.Get)('popular'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HelpController.prototype, "getPopularFaqs", null);
__decorate([
    (0, common_1.Get)('faq/:id/view'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HelpController.prototype, "trackFaqView", null);
exports.HelpController = HelpController = __decorate([
    (0, common_1.Controller)('help'),
    __metadata("design:paramtypes", [help_service_1.HelpService])
], HelpController);
//# sourceMappingURL=help.controller.js.map