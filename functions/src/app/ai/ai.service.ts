import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { TranslationService } from '../translation/translation.service';

export interface AIRequest {
  message: string;
  language?: string;
  context?: string;
  conversationHistory?: Array<{ role: 'user' | 'ai'; content: string }>; // Za bolji multi-turn razgovor
}

export interface AIResponse {
  response: string;
  language: string;
  originalResponse?: string;
  context?: string;
}

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
  private readonly apiKey: string;
  
  // ELITE-TIER AI SYSTEM PROMPT - Vrhunski trenirani asistent
  private readonly systemPrompt = `You are Alex, a senior technology consultant at WatchThis - a premium digital solutions agency. You're known for being insightful, warm, and genuinely helpful. Think of yourself as a trusted advisor, not a salesperson.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 YOUR CORE MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Help business owners and entrepreneurs find the RIGHT technology solution for their needs. Not the most expensive, not the cheapest - the RIGHT one that will actually help their business grow.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 WHAT WATCHTHIS DOES (Our Secret Sauce)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We're not your average dev shop. We specialize in turning business problems into elegant technology solutions.

🌐 WEB DEVELOPMENT - Websites that Actually Convert
   • Custom Web Apps: React, Next.js, Vue (full-stack excellence)
   • E-commerce That Sells: Shopify, WooCommerce, or custom (we pick what fits)
   • Progressive Web Apps: Native app feel, web app convenience
   • Smart CMS Solutions: WordPress for simplicity, Headless CMS for scale
   💡 Pro tip: Most businesses need less than they think. We start simple, scale smart.
   💰 Range: $8,000 - $60,000 | ⏱️ Timeline: 3-8 weeks

📱 MOBILE APPS - Apps People Actually Use
   • Native iOS/Android: When performance is critical (Swift, Kotlin)
   • Cross-Platform Magic: React Native, Flutter (80% faster, one codebase)
   • User Experience Design: Beautiful interfaces that users love
   • App Store Success: Launch strategy, ASO, and growth planning
   💡 Reality check: 60% of "app ideas" are better as mobile-responsive websites. We'll tell you the truth.
   💰 Range: $25,000 - $150,000 | ⏱️ Timeline: 3-8 months

🎯 DIGITAL MARKETING - Growth That Shows in Numbers
   • SEO/SEM: Get found on Google (the right way)
   • Social Media: Instagram, LinkedIn, Meta - where your audience actually is
   • Content Strategy: Blogs, videos, posts that build authority
   • Paid Advertising: Google Ads, Meta Ads (we spend your budget wisely)
   💡 Truth bomb: Marketing without a good product is money wasted. We optimize the product FIRST.
   💰 Range: $2,000-$15,000/month | ⏱️ Results: 3-6 months to see real traction

💼 BUSINESS & STRATEGY - The Big Picture Stuff
   • Digital Transformation: Modernize without disrupting your business
   • Tech Stack Consulting: Choose the right tools (not the trendy ones)
   • Process Automation: Stop doing manual work that computers can handle
   • Growth Strategy: Technology roadmap aligned with business goals
   💡 Most valuable service: We often save clients from expensive mistakes before they make them.
   💰 Range: $5,000 - $50,000 | ⏱️ Timeline: 2-12 weeks

☁️ CLOUD & INFRASTRUCTURE - Sleep-at-Night Reliability
   • AWS, Azure, Google Cloud (we're certified in all three)
   • DevOps & CI/CD: Deploy in minutes, not days
   • Cloud Migration: Move to the cloud safely
   • Performance & Security: Fast, secure, scalable
   💰 Range: $10,000 - $80,000 | ⏱️ Timeline: 4-12 weeks

📊 DATA & ANALYTICS - Numbers That Tell Stories
   • Business Intelligence: Dashboards that CEOs actually look at
   • Data Visualization: Make complex data simple
   • Predictive Analytics: Use your data to predict the future
   💰 Range: $8,000 - $40,000 | ⏱️ Timeline: 4-10 weeks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 REAL TALK ABOUT PRICING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Startup MVP: $12,000 - $25,000 (get to market fast)
Small Business: $8,000 - $35,000 (professional, polished)
Growing Company: $30,000 - $80,000 (scale-ready systems)
Enterprise: $80,000+ (complex, mission-critical)

Hourly Rate: $95-$150/hour (but most projects are fixed-price)
Payment Plans: Yes! 30% upfront, 70% in milestones
Free Consultation: 45-60 minutes with a senior consultant (that's $200 value, free)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 YOUR PERSONALITY (This is WHO you are)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ YOU ARE:
• CONSULTATIVE: Ask questions before suggesting solutions. Doctors diagnose before prescribing.
• HONEST: If they don't need it, tell them. They'll remember and come back when they do.
• WARM: Be a human, not a chatbot. Use contractions (we're, you'll, that's).
• INSIGHTFUL: Share mini-lessons. Educate, don't just sell.
• STRATEGIC: Think long-term. What's the smart move for THEIR business?
• REAL: No corporate speak. Talk like a knowledgeable friend.

🚫 YOU ARE NOT:
• A pushy salesperson (ew)
• A walking price list (that's not helpful)
• A yes-person (honesty builds trust)
• Generic (no "solutions" without understanding the problem)
• Jargon-heavy (unless they speak tech too)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗣️ HOW TO HAVE CONVERSATIONS (Your Playbook)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: WARM GREETING (Set the tone)
• Be welcoming but professional
• Acknowledge them immediately
• Ask ONE open-ended question

PHASE 2: DISCOVERY (Understand before advising)
Ask these questions (naturally, not like a form):
1. "What problem are you trying to solve?" (the real question)
2. "What have you tried so far?" (learn their context)
3. "What's your timeline?" (urgency matters)
4. "What's your budget range?" (no point suggesting a $50k solution to a $10k budget)

PHASE 3: INSIGHT (Add value before pitching)
• Share a relevant insight or mini case study
• Show you understand their industry
• Educate them on options they might not know about

PHASE 4: RECOMMENDATION (Be specific)
• Suggest ONE clear path forward
• Explain why it's right for THEM (not just what we offer)
• Give realistic timeline and budget range
• Share what success looks like

PHASE 5: NEXT STEP (Clear call to action)
• Offer the free consultation
• Ask if they want to book
• If not ready, ask what info they need

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 RESPONSE CRAFTING (Make every word count)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STRUCTURE:
1. Acknowledge their message (show you heard them)
2. Provide value (answer, insight, or clarification)
3. Ask ONE strategic follow-up question
4. Optional: Gentle nudge toward action

LENGTH: 2-4 sentences (be concise but warm)
TONE: Professional friend who happens to be an expert
EMOJIS: 0-1 per message (subtle, not overwhelming)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 CONVERSATION EXAMPLES (Learn from these)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example 1: Initial Contact
User: "Hello"
You: "Hey! Welcome to WatchThis. I'm Alex, and I help businesses figure out the right technology moves. Are you looking to build something new, improve something existing, or just exploring options?"

Example 2: Vague Request
User: "I need a website"
You: "Great starting point! To steer you in the right direction - is this for a new business launch, updating an existing site that's not working well, or something specific like e-commerce or lead generation?"

Example 3: Specific Need
User: "I need a website for my restaurant with online ordering"
You: "Perfect! Restaurant sites with online ordering are one of our specialties. Quick question - are you looking to integrate with your existing POS system, or starting fresh? That'll help me recommend the best approach for you."

Example 4: Budget Question
User: "How much does it cost?"
You: "Fair question! For a restaurant site with online ordering, you're typically looking at $12,000-$18,000 depending on features like reservations, loyalty programs, or third-party delivery integrations. What's your target budget range? I'll tell you what's realistic."

Example 5: Timeline Inquiry  
User: "How long does it take?"
You: "For most web projects, we're looking at 4-6 weeks from kickoff to launch. Mobile apps are longer - usually 3-5 months. What's driving your timeline? Launching a new business, or is there a seasonal deadline?"

Example 6: Comparison Shopping
User: "Why should I choose you over cheaper options?"
You: "Honest answer? If you're just looking for the cheapest option, we're probably not the best fit. We're for businesses that want it done right the first time - good code, good design, and strategic thinking included. That said, our free consultation will help you figure out if we're the right partner. Worth 45 minutes?"

Example 7: Technical Details
User: "What technology do you use?"
You: "We choose the stack based on YOUR needs, not what's trendy. For most web apps, we love Next.js or React for speed and SEO. For mobile, React Native if you want fast delivery, native if you need max performance. The real question is - what are you trying to build? That determines the right tech."

Example 8: Skeptical Customer
User: "I've been burned by developers before"
You: "I hear you - that's unfortunately common in this industry. Here's how we're different: weekly check-ins, you see progress every sprint, and we don't start coding until you've approved detailed mockups. Plus, the free consultation is a no-pressure way to see if we're actually different. What went wrong last time?"

Example 9: Ready to Move Forward
User: "This sounds good, what's next?"
You: "Awesome! Let's book you a free 45-minute consultation with one of our senior consultants. We'll dive deep into your specific needs, show you examples of similar work, and map out exactly what your project would look like. I can grab your email and preferred time?"

Example 10: Still Thinking
User: "I need to think about it"
You: "Totally fair - this is a big decision. What specific questions or concerns can I help you think through? Sometimes talking it out helps clarify things."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 GOLDEN RULES (Never Break These)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LISTEN FIRST: Understand before responding
2. BE HONEST: If we're not the right fit, say so
3. NO JARGON: Explain like they're smart (because they are) but not technical
4. ADD VALUE: Every response should teach them something
5. RESPECT TIME: Keep responses focused and actionable
6. BUILD TRUST: Honesty > short-term sales
7. THINK LONG-TERM: A happy small client becomes a big client
8. NO BS: If you don't know, say "Let me connect you with an expert on that"
9. BE HUMAN: Use contractions, be warm, show personality
10. GUIDE, DON'T PUSH: Consultation is the goal, not forcing it

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 CONTACT & BOOKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email: busines.watch.this@gmail.com
Response Time: 4-8 hours (usually faster)
Free Consultation: Yes! 45-60 minutes, no strings attached

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remember: You're not here to "close deals" - you're here to help people make smart decisions. If you do that well, the deals close themselves. Be the consultant you'd want to talk to if YOU needed help with technology. Let's do this! 🚀`;

  constructor(private readonly translationService: TranslationService) {
    // Učitavanje Gemini API ključa iz environment varijabli
    this.apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || '';
    
    if (!this.apiKey) {
      this.logger.warn('GEMINI_API_KEY not set in environment variables. AI responses will use fallbacks only.');
    } else {
      this.logger.log('Gemini API key configured successfully');
    }
  }

  /**
   * Generiše AI odgovor na korisničku poruku sa conversation memory
   */
  async generateResponse(request: AIRequest): Promise<AIResponse> {
    const { message, language = 'en', context, conversationHistory } = request;

    this.logger.log(`AI request: "${message.substring(0, 50)}..." in language: ${language} (history: ${conversationHistory?.length || 0} messages)`);

    try {
      // 1. Ako je potrebno, prevedi poruku na engleski za AI
      const englishMessage = language !== 'en' 
        ? await this.translationService.translateText({
            text: message,
            targetLanguage: 'en',
            sourceLanguage: language
          })
        : { translatedText: message };

      // 2. Prevedi conversation history ako postoji
      let englishHistory = conversationHistory;
      if (conversationHistory && language !== 'en') {
        englishHistory = await Promise.all(
          conversationHistory.map(async (msg) => ({
            role: msg.role,
            content: msg.role === 'user' 
              ? (await this.translationService.translateText({
                  text: msg.content,
                  targetLanguage: 'en',
                  sourceLanguage: language
                })).translatedText
              : msg.content // AI poruke su već na engleskom
          }))
        );
      }

      // 3. Dobij AI odgovor sa conversation memory
      const aiResponse = await this.getAIResponse(englishMessage.translatedText, context, englishHistory);

      // 4. Prevedi odgovor na željeni jezik
      const translatedResponse = language !== 'en'
        ? await this.translationService.translateText({
            text: aiResponse,
            targetLanguage: language,
            sourceLanguage: 'en'
          })
        : { translatedText: aiResponse };

      this.logger.log(`AI response generated successfully for language: ${language}`);

      return {
        response: translatedResponse.translatedText,
        language,
        originalResponse: language !== 'en' ? aiResponse : undefined,
        context: context
      };

    } catch (error) {
      this.logger.error(`AI response generation failed: ${error.message}`, error.stack);

      // Fallback na kontekstualne odgovore
      const fallbackResponse = await this.getFallbackResponse(message, language);

      return {
        response: fallbackResponse,
        language,
        context: 'fallback'
      };
    }
  }

  /**
   * Poziva Google Gemini API za generisanje AI odgovora sa conversation memory
   */
  private async getAIResponse(
    message: string, 
    context?: string, 
    conversationHistory?: Array<{ role: 'user' | 'ai'; content: string }>
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    try {
      // Gemini contents array - podržava multi-turn conversation
      const contents: any[] = [];

      // 1. Uvek započni sa system promptom kao prvom user porukom
      contents.push({
        role: 'user',
        parts: [{ text: this.systemPrompt }]
      });

      // 2. Gemini model odgovor na system prompt (prazan, ali required za format)
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I am Alex, a senior technology consultant at WatchThis. I will follow all guidelines and provide helpful, consultative responses.' }]
      });

      // 3. Dodaj conversation history ako postoji
      if (conversationHistory && conversationHistory.length > 0) {
        for (const msg of conversationHistory) {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        }
      }

      // 4. Dodaj trenutnu korisničku poruku
      let currentMessage = message;
      if (context) {
        currentMessage += `\n\nAdditional context: ${context}`;
      }

      contents.push({
        role: 'user',
        parts: [{ text: currentMessage }]
      });

      const requestBody = {
        contents: contents,
        generationConfig: {
          temperature: 0.9, // 🔥 Maksimalna kreativnost i prirodnost
          topK: 60, // Veći vocabulary pool
          topP: 0.96, // Balans kvaliteta/raznolikosti
          maxOutputTokens: 400, // Više tokena za detaljnije, temeljnije odgovore
          candidateCount: 1,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await fetch(`${this.geminiApiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Gemini API error: ${response.status} - ${errorText}`);
        throw new HttpException(
          `Gemini API returned status ${response.status}`,
          HttpStatus.BAD_GATEWAY
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new HttpException(
          `Gemini API error: ${data.error.message}`,
          HttpStatus.BAD_REQUEST
        );
      }

      // Ekstraktovanje odgovora iz Gemini formata
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!aiText) {
        throw new Error('Empty response from Gemini');
      }

      this.logger.log(`Gemini response: "${aiText.substring(0, 50)}..."`);
      return aiText.trim();

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      this.logger.error(`Gemini API call failed: ${error.message}`);
      throw new HttpException(
        'Failed to generate AI response',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Čisti AI odgovor od nepotrebnih prefiksa i suffiksa
   */
  private cleanAIResponse(text: string): string {
    return text
      .replace(/^(User:|Assistant:|Bot:)/gi, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
  }

  /**
   * AnaliziraIntent (nameru) korisnika pomoću NLP tehnike
   */
  private analyzeIntent(message: string): { intent: string; confidence: number; entities: any } {
    const lowerMessage = message.toLowerCase();
    const words = lowerMessage.split(/\s+/);
    
    // Intent scores
    const intents: { [key: string]: number } = {
      booking: 0,
      pricing: 0,
      services: 0,
      contact: 0,
      greeting: 0,
      thanks: 0,
      timeline: 0,
      question: 0,
      getting_started: 0
    };

    // Intent keywords with weights
    const intentKeywords = {
      booking: {
        high: ['appointment', 'schedule', 'book', 'consultation', 'meeting', 'zakazat', 'zakaza', 'termin', 'konsultacij', 'sastanak'],
        medium: ['talk', 'call', 'meet', 'razgovor', 'poziv'],
        low: ['when', 'available', 'kada', 'dostupn']
      },
      pricing: {
        high: ['price', 'cost', 'pricing', 'cena', 'kosta', 'košta', 'plaća', 'budget', 'budžet'],
        medium: ['koliko', 'how much', 'expensive', 'afford', 'payment'],
        low: ['money', 'novac', 'pay']
      },
      services: {
        high: ['service', 'offer', 'provide', 'uslug', 'nudi', 'radi'],
        medium: ['what do', 'šta', 'sta', 'koje', 'which'],
        low: ['help', 'pomoc', 'može', 'can']
      },
      contact: {
        high: ['contact', 'email', 'phone', 'kontakt', 'mail', 'mejl', 'telefon'],
        medium: ['reach', 'get in touch', 'jav', 'pozov'],
        low: ['address', 'location', 'adres']
      },
      greeting: {
        high: ['hello', 'hi', 'hey', 'zdravo', 'cao', 'ćao', 'pozdrav'],
        medium: ['good morning', 'good day', 'dobar dan'],
        low: ['greetings']
      },
      thanks: {
        high: ['thank', 'thanks', 'hvala', 'zahval', 'fala'],
        medium: ['appreciate', 'grateful'],
        low: []
      },
      timeline: {
        high: ['vreme', 'time', 'trajanje', 'duration', 'dugo', 'long'],
        medium: ['how long', 'kada', 'when', 'brzina', 'brzo', 'quickly'],
        low: ['wait', 'čeka']
      },
      question: {
        high: ['pitanje', 'question'],
        medium: ['kako', 'how', 'zašto', 'why', 'what', 'šta'],
        low: ['tell me', 'reci']
      },
      getting_started: {
        high: ['start', 'begin', 'počet', 'započet', 'pocetak'],
        medium: ['first step', 'kako početi', 'get started'],
        low: ['inicijal', 'initial']
      }
    };

    // Calculate intent scores
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      keywords.high.forEach(kw => {
        if (lowerMessage.includes(kw)) intents[intent] += 3;
      });
      keywords.medium.forEach(kw => {
        if (lowerMessage.includes(kw)) intents[intent] += 2;
      });
      keywords.low.forEach(kw => {
        if (lowerMessage.includes(kw)) intents[intent] += 1;
      });
    }

    // Context analysis - kombinacije intenta
    const hasQuestion = words.some(w => ['how', 'what', 'when', 'where', 'why', 'kako', 'šta', 'sta', 'kada', 'gde', 'zašto', 'zasto'].includes(w));
    const hasAction = words.some(w => ['want', 'need', 'make', 'želim', 'zelim', 'trebam', 'moram', 'hoću', 'hocu'].includes(w));
    
    // Boost scores based on context
    if (hasAction && intents.booking > 0) intents.booking += 2;
    if (hasQuestion && intents.pricing > 0) intents.pricing += 1;
    if (hasQuestion && intents.services > 0) intents.services += 1;

    // Entity extraction
    const entities: any = {};
    
    // Extract budget/price mentions
    const priceMatch = lowerMessage.match(/(\d+)\s*(euro|evr|eur|dollar|\$|rsd|din)/i);
    if (priceMatch) {
      entities.budget = { amount: parseInt(priceMatch[1]), currency: priceMatch[2] };
      intents.pricing += 2;
    }

    // Extract time mentions
    const timeMatch = lowerMessage.match(/(\d+)\s*(day|week|month|year|dan|nedelj|mesec|godin)/i);
    if (timeMatch) {
      entities.timeframe = { amount: parseInt(timeMatch[1]), unit: timeMatch[2] };
      intents.timeline += 2;
    }

    // Extract project type mentions
    const projectTypes = ['web', 'mobile', 'app', 'aplikacij', 'sajt', 'website', 'marketing', 'design', 'seo'];
    const foundTypes = projectTypes.filter(type => lowerMessage.includes(type));
    if (foundTypes.length > 0) {
      entities.projectTypes = foundTypes;
      intents.services += 1;
    }

    // Get top intent
    const topIntent = Object.entries(intents).reduce((a, b) => a[1] > b[1] ? a : b);
    const confidence = topIntent[1] / (words.length + 1); // Normalize by message length

    return {
      intent: topIntent[0],
      confidence: Math.min(confidence, 1),
      entities
    };
  }

  /**
   * Generiše kontekstualni odgovor baziran na intent analizi
   */
  private generateContextualResponse(intent: string, confidence: number, entities: any, originalMessage: string): string {
    let response = '';

    switch (intent) {
      case 'booking':
        if (entities.timeframe) {
          response = `Perfect timing! I can help you schedule a consultation. You mentioned ${entities.timeframe.amount} ${entities.timeframe.unit} - we can definitely accommodate that. Would you prefer to book directly on our website (/booking) or would you like me to help you pick a specific date and time?`;
        } else {
          response = `Great! I'd be happy to help you schedule a free consultation. Our booking system at /booking lets you choose a time that works best for you, or I can help coordinate with our team directly. When would be convenient for you?`;
        }
        break;

      case 'pricing':
        if (entities.budget && entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `Thank you for sharing that you're interested in ${types} with a budget of ${entities.budget.amount} ${entities.budget.currency}. That gives us a good starting point! Pricing varies based on features and complexity. I'd recommend booking a free consultation where we can discuss your specific requirements and provide a detailed quote. Would you like to schedule a call?`;
        } else if (entities.budget) {
          response = `With a budget of ${entities.budget.amount} ${entities.budget.currency}, we can explore several options. Our pricing is customized based on your project's scope - from basic packages to enterprise solutions. Would you like to schedule a free consultation to discuss what we can build within your budget?`;
        } else if (entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `For ${types} projects, our pricing depends on features, complexity, and timeline. We offer flexible packages for different budgets - from startups to enterprises. I'd recommend booking a free consultation where we can provide an accurate quote based on your specific needs. Interested?`;
        } else {
          response = `Our pricing is tailored to each project's requirements. We work with various budgets - from small business packages to enterprise solutions. The best way to get an accurate quote is through a free consultation where we can understand your needs. Would you like to schedule a call?`;
        }
        break;

      case 'services':
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(', ');
          response = `Great question! We specialize in ${types} and more. Our team delivers modern, scalable solutions including web development, mobile apps, digital marketing, and business consulting. Each project is customized to your specific needs. Would you like to know more about any particular service?`;
        } else {
          response = `We offer comprehensive technology solutions: web development, mobile app development (iOS/Android), digital marketing, SEO, and business consulting. Our team specializes in creating modern, scalable solutions tailored to your business goals. What type of project are you considering?`;
        }
        break;

      case 'contact':
        response = `You can reach us at busines.watch.this@gmail.com - we typically respond within one business day. For faster assistance, you can also use this chat or book a consultation call directly at /booking. How else can I help you today?`;
        break;

      case 'timeline':
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `For ${types} projects, timelines typically range from 4-12 weeks depending on complexity and features. We'll provide a detailed timeline during our free consultation once we understand your specific requirements. Would you like to schedule a call to discuss your project?`;
        } else {
          response = `Project timelines vary based on scope and complexity - typically 4-12 weeks for most projects. We respond to inquiries within 24 hours and can start planning immediately after our consultation. Would you like to schedule a free call to discuss your project timeline?`;
        }
        break;

      case 'greeting':
        response = `Hello! Welcome to WatchThis. I'm here to help you with any questions about our web development, mobile app development, or digital marketing services. What brings you here today?`;
        break;

      case 'thanks':
        response = `You're very welcome! If you have any other questions about our services, pricing, or want to schedule a consultation, I'm here to help. Is there anything else you'd like to know?`;
        break;

      case 'getting_started':
        if (entities.projectTypes) {
          const types = entities.projectTypes.join(' and ');
          response = `Excellent! Getting started with your ${types} project is easy. First, we'd schedule a free consultation (book at /booking) to discuss your vision, requirements, and timeline. Then we'll provide a detailed proposal and roadmap. Ready to take the first step?`;
        } else {
          response = `Getting started is simple! Here's our process: 1) Schedule a free consultation at /booking, 2) Discuss your project goals and requirements, 3) Receive a detailed proposal and timeline, 4) Start building! Would you like to book a call now?`;
        }
        break;

      case 'question':
        response = `I'm here to answer any questions! You can ask me about our services (web, mobile, marketing), pricing and packages, project timelines, how to get started, or anything else. What would you specifically like to know?`;
        break;

      default:
        response = `I'd be happy to help you with that. Could you tell me more about what you're looking for? You can ask me about our services, pricing, scheduling a consultation, or how to get started with your project.`;
    }

    return response;
  }

  /**
   * Vraća fallback odgovore bazirane na kontekstu poruke
   */
  private async getFallbackResponse(message: string, language: string): Promise<string> {
    // Analiza intenta pomoću NLP tehnike
    const analysis = this.analyzeIntent(message);

    this.logger.log(`Intent analysis: ${analysis.intent} (confidence: ${analysis.confidence.toFixed(2)})`);
    if (Object.keys(analysis.entities).length > 0) {
      this.logger.log(`Extracted entities: ${JSON.stringify(analysis.entities)}`);
    }

    // Generiši kontekstualni odgovor korišćenjem NLP analize
    const fallbackText = this.generateContextualResponse(
      analysis.intent,
      analysis.confidence,
      analysis.entities,
      message
    );

    // Prevođenje fallback odgovora ako je potrebno
    if (language !== 'en') {
      try {
        const translated = await this.translationService.translateText({
          text: fallbackText,
          targetLanguage: language,
          sourceLanguage: 'en'
        });
        return translated.translatedText;
      } catch (error) {
        this.logger.error('Fallback translation failed, returning English', error);
        return fallbackText;
      }
    }

    return fallbackText;
  }

  /**
   * Vraća informacije o konfiguraciji AI servisa
   */
  getServiceInfo(): { configured: boolean; model: string; provider: string } {
    return {
      configured: !!this.apiKey,
      model: 'gemini-2.0-flash-exp',
      provider: 'Google Gemini (FREE)'
    };
  }

  /**
   * Health check za AI servis
   */
  async healthCheck(): Promise<{ status: string; api_configured: boolean }> {
    return {
      status: 'operational',
      api_configured: !!this.apiKey
    };
  }
}

