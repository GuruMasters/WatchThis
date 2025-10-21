import { HelpService } from './help.service';
export declare class HelpController {
    private readonly helpService;
    constructor(helpService: HelpService);
    searchFaqs(query: string, category?: string): Promise<{
        success: boolean;
        query: string;
        category: string;
        results: any[];
        total: number;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        query: string;
        results: any[];
        category?: undefined;
        total?: undefined;
    }>;
    getFaqCategories(): Promise<{
        success: boolean;
        categories: any[];
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        categories: any[];
    }>;
    getPopularFaqs(limit?: string): Promise<{
        success: boolean;
        faqs: any[];
        total: number;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        faqs: any[];
        total?: undefined;
    }>;
    trackFaqView(faqId: string): Promise<{
        success: boolean;
        message: any;
    }>;
}
