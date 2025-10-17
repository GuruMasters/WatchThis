import { Injectable, Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryService {
  private readonly logger = new Logger(SentryService.name);
  private initialized = false;

  constructor() {
    this.initSentry();
  }

  /**
   * Initialize Sentry for Backend Monitoring
   */
  private initSentry() {
    const sentryDsn = process.env.SENTRY_DSN;
    const isProduction = process.env.NODE_ENV === 'production';

    if (!sentryDsn) {
      this.logger.warn('Sentry DSN not configured. Monitoring disabled.');
      return;
    }

    try {
      Sentry.init({
        dsn: sentryDsn,
        environment: process.env.NODE_ENV || 'development',
        enabled: isProduction || process.env.ENABLE_SENTRY === 'true',

        // Performance sampling
        tracesSampleRate: isProduction ? 0.1 : 1.0,

        // Release tracking
        release: process.env.APP_VERSION || 'unknown',

        // Before sending events
        beforeSend(event, hint) {
          // Filter sensitive data
          if (event.request) {
            // Remove sensitive headers
            if (event.request.headers) {
              delete event.request.headers['authorization'];
              delete event.request.headers['cookie'];
            }

            // Remove query parameters with sensitive data
            if (event.request.query_string) {
              const sensitiveParams = ['token', 'apikey', 'password', 'secret'];
              const queryStr = typeof event.request.query_string === 'string' 
                ? event.request.query_string 
                : JSON.stringify(event.request.query_string);
              const hasSensitiveParam = sensitiveParams.some(param => 
                queryStr.toLowerCase().includes(param.toLowerCase())
              );
              if (hasSensitiveParam) {
                event.request.query_string = '[FILTERED]';
              }
            }
          }

          return event;
        },

        // Custom tags
        initialScope: {
          tags: {
            app: 'watchthis-backend',
          },
        },
      });

      this.initialized = true;
      this.logger.log('Sentry initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Sentry', error);
    }
  }

  /**
   * Capture exception
   */
  captureException(error: Error, context?: Record<string, any>) {
    if (!this.initialized) return;

    Sentry.captureException(error, {
      contexts: context ? { custom: context } : undefined,
    });
  }

  /**
   * Capture message
   */
  captureMessage(message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>) {
    if (!this.initialized) return;

    Sentry.captureMessage(message, {
      level,
      contexts: context ? { custom: context } : undefined,
    });
  }

  /**
   * Add breadcrumb
   */
  addBreadcrumb(message: string, data?: Record<string, any>) {
    if (!this.initialized) return;

    Sentry.addBreadcrumb({
      message,
      data,
      level: 'info',
    });
  }

  /**
   * Set user context
   */
  setUser(user: { id: string; email?: string; username?: string }) {
    if (!this.initialized) return;

    Sentry.setUser(user);
  }

  /**
   * Clear user context
   */
  clearUser() {
    if (!this.initialized) return;

    Sentry.setUser(null);
  }

  /**
   * Create span for performance monitoring
   */
  startSpan(name: string, op: string) {
    if (!this.initialized) return null;

    return Sentry.startSpan({
      name,
      op,
    }, () => {
      // Span will be automatically finished
    });
  }

  /**
   * Get Sentry instance (for middleware)
   */
  getInstance() {
    return Sentry;
  }
}

