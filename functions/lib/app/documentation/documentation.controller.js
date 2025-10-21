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
exports.DocumentationController = void 0;
const common_1 = require("@nestjs/common");
const documentation_service_1 = require("./documentation.service");
let DocumentationController = class DocumentationController {
    constructor(documentationService) {
        this.documentationService = documentationService;
    }
    async downloadResource(resourceId, res) {
        try {
            return await this.documentationService.downloadResource(resourceId, res);
        }
        catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message || 'Resource not found'
            });
        }
    }
    async getResourceStats() {
        return this.documentationService.getResourceStats();
    }
};
exports.DocumentationController = DocumentationController;
__decorate([
    (0, common_1.Get)('download/:resourceId'),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentationController.prototype, "downloadResource", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentationController.prototype, "getResourceStats", null);
exports.DocumentationController = DocumentationController = __decorate([
    (0, common_1.Controller)('documentation'),
    __metadata("design:paramtypes", [documentation_service_1.DocumentationService])
], DocumentationController);
//# sourceMappingURL=documentation.controller.js.map