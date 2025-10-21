"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationModule = void 0;
const common_1 = require("@nestjs/common");
const documentation_controller_1 = require("./documentation.controller");
const documentation_service_1 = require("./documentation.service");
let DocumentationModule = class DocumentationModule {
};
exports.DocumentationModule = DocumentationModule;
exports.DocumentationModule = DocumentationModule = __decorate([
    (0, common_1.Module)({
        controllers: [documentation_controller_1.DocumentationController],
        providers: [documentation_service_1.DocumentationService],
        exports: [documentation_service_1.DocumentationService],
    })
], DocumentationModule);
//# sourceMappingURL=documentation.module.js.map