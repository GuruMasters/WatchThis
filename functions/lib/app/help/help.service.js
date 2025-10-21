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
var HelpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpService = void 0;
const common_1 = require("@nestjs/common");
const admin = __importStar(require("firebase-admin"));
let HelpService = HelpService_1 = class HelpService {
    constructor() {
        this.logger = new common_1.Logger(HelpService_1.name);
        this.logger.log('Initializing help service...');
    }
    async searchFaqs(query, category) {
        try {
            this.logger.log(`Searching FAQs with query: ${query}, category: ${category}`);
            const db = admin.firestore();
            let queryRef = db.collection('help_faqs');
            // Apply category filter if provided
            if (category && category !== 'all') {
                queryRef = queryRef.where('category', '==', category);
            }
            const snapshot = await queryRef.get();
            const faqs = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const faq = Object.assign(Object.assign({ id: doc.id }, data), { 
                    // Add search relevance score
                    relevance: this.calculateRelevance(data, query) });
                // Filter by search term if provided
                if (query) {
                    const searchTerm = query.toLowerCase();
                    const matchesQuestion = data.question.toLowerCase().includes(searchTerm);
                    const matchesAnswer = data.answer.toLowerCase().includes(searchTerm);
                    const matchesTags = data.tags && data.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
                    if (matchesQuestion || matchesAnswer || matchesTags) {
                        faqs.push(faq);
                    }
                }
                else {
                    faqs.push(faq);
                }
            });
            // Sort by relevance score
            return faqs.sort((a, b) => b.relevance - a.relevance);
        }
        catch (error) {
            this.logger.error('Failed to search FAQs:', error);
            throw error;
        }
    }
    calculateRelevance(faq, searchTerm) {
        if (!searchTerm)
            return 0;
        const term = searchTerm.toLowerCase();
        let score = 0;
        // Exact match in title gets highest score
        if (faq.question.toLowerCase().includes(term)) {
            score += 10;
        }
        // Match in answer gets medium score
        if (faq.answer.toLowerCase().includes(term)) {
            score += 5;
        }
        // Match in tags gets lower score
        if (faq.tags && faq.tags.some((tag) => tag.toLowerCase().includes(term))) {
            score += 3;
        }
        // Boost score for featured/popular FAQs
        if (faq.featured) {
            score += 2;
        }
        return score;
    }
    async getFaqCategories() {
        try {
            const db = admin.firestore();
            const categoriesRef = db.collection('help_categories');
            const snapshot = await categoriesRef.get();
            const categories = [];
            snapshot.forEach(doc => {
                categories.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return categories;
        }
        catch (error) {
            this.logger.error('Failed to get FAQ categories:', error);
            throw error;
        }
    }
    async trackFaqView(faqId) {
        try {
            const db = admin.firestore();
            await db.collection('help_faq_views').add({
                faqId: faqId,
                timestamp: new Date(),
                source: 'help-center'
            });
            this.logger.log(`FAQ view tracked: ${faqId}`);
        }
        catch (error) {
            this.logger.error('Failed to track FAQ view:', error);
            // Don't throw - tracking failure shouldn't break the request
        }
    }
    async getPopularFaqs(limit = 10) {
        try {
            const db = admin.firestore();
            const viewsRef = db.collection('help_faq_views');
            // This would require aggregation in a real implementation
            // For now, return featured FAQs
            const faqsRef = db.collection('help_faqs').where('featured', '==', true);
            const snapshot = await faqsRef.limit(limit).get();
            const faqs = [];
            snapshot.forEach(doc => {
                faqs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return faqs;
        }
        catch (error) {
            this.logger.error('Failed to get popular FAQs:', error);
            throw error;
        }
    }
};
exports.HelpService = HelpService;
exports.HelpService = HelpService = HelpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], HelpService);
//# sourceMappingURL=help.service.js.map