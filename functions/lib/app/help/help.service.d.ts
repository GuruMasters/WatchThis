export declare class HelpService {
    private readonly logger;
    constructor();
    searchFaqs(query: string, category?: string): Promise<any[]>;
    private calculateRelevance;
    getFaqCategories(): Promise<any[]>;
    trackFaqView(faqId: string): Promise<void>;
    getPopularFaqs(limit?: number): Promise<any[]>;
}
