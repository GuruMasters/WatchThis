import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class HelpService {
  private readonly logger = new Logger(HelpService.name);

  constructor() {
    this.logger.log('Initializing help service...');
  }

  async searchFaqs(query: string, category?: string): Promise<any[]> {
    try {
      this.logger.log(`Searching FAQs with query: ${query}, category: ${category}`);

      const db = admin.firestore();
      let queryRef: any = db.collection('help_faqs');

      // Apply category filter if provided
      if (category && category !== 'all') {
        queryRef = queryRef.where('category', '==', category);
      }

      const snapshot = await queryRef.get();
      const faqs = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        const faq = {
          id: doc.id,
          ...data,
          // Add search relevance score
          relevance: this.calculateRelevance(data, query)
        };

        // Filter by search term if provided
        if (query) {
          const searchTerm = query.toLowerCase();
          const matchesQuestion = data.question.toLowerCase().includes(searchTerm);
          const matchesAnswer = data.answer.toLowerCase().includes(searchTerm);
          const matchesTags = data.tags && data.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm));

          if (matchesQuestion || matchesAnswer || matchesTags) {
            faqs.push(faq);
          }
        } else {
          faqs.push(faq);
        }
      });

      // Sort by relevance score
      return faqs.sort((a, b) => b.relevance - a.relevance);

    } catch (error) {
      this.logger.error('Failed to search FAQs:', error);
      throw error;
    }
  }

  private calculateRelevance(faq: any, searchTerm: string): number {
    if (!searchTerm) return 0;

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
    if (faq.tags && faq.tags.some((tag: string) => tag.toLowerCase().includes(term))) {
      score += 3;
    }

    // Boost score for featured/popular FAQs
    if (faq.featured) {
      score += 2;
    }

    return score;
  }

  async getFaqCategories(): Promise<any[]> {
    try {
      const db = admin.firestore();
      const categoriesRef = db.collection('help_categories');
      const snapshot = await categoriesRef.get();

      const categories = [];
      snapshot.forEach(doc => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return categories;
    } catch (error) {
      this.logger.error('Failed to get FAQ categories:', error);
      throw error;
    }
  }

  async trackFaqView(faqId: string): Promise<void> {
    try {
      const db = admin.firestore();
      await db.collection('help_faq_views').add({
        faqId: faqId,
        timestamp: new Date(),
        source: 'help-center'
      });

      this.logger.log(`FAQ view tracked: ${faqId}`);
    } catch (error) {
      this.logger.error('Failed to track FAQ view:', error);
      // Don't throw - tracking failure shouldn't break the request
    }
  }

  async getPopularFaqs(limit: number = 10): Promise<any[]> {
    try {
      const db = admin.firestore();
      const viewsRef = db.collection('help_faq_views');

      // This would require aggregation in a real implementation
      // For now, return featured FAQs
      const faqsRef = db.collection('help_faqs').where('featured', '==', true);
      const snapshot = await faqsRef.limit(limit).get();

      const faqs = [];
      snapshot.forEach(doc => {
        faqs.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return faqs;
    } catch (error) {
      this.logger.error('Failed to get popular FAQs:', error);
      throw error;
    }
  }
}
