import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry for Frontend Monitoring
 * - Error tracking
 * - Performance monitoring
 * - User feedback
 */
export function initSentry() {
  // Only initialize in production or if explicitly enabled
  const isProduction = import.meta.env.MODE === 'production';
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  if (!sentryDsn) {
    console.warn('Sentry DSN not configured. Monitoring disabled.');
    return;
  }

  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE || 'development',
    enabled: isProduction || import.meta.env.VITE_ENABLE_SENTRY === 'true',

    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.feedbackIntegration({
        // User feedback widget
        colorScheme: 'system',
        isNameRequired: true,
        isEmailRequired: true,
      }),
    ],

    // Performance sampling
    tracesSampleRate: isProduction ? 0.1 : 1.0, // 10% in production, 100% in dev

    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || 'unknown',

    // Before sending events
    beforeSend(event, hint) {
      // Filter out non-critical errors
      if (event.exception) {
        const error = hint.originalException;
        
        // Ignore browser extension errors
        if (error && error.toString().includes('chrome-extension://')) {
          return null;
        }

        // Ignore specific error patterns
        const ignoredPatterns = [
          /ResizeObserver loop/i,
          /Loading chunk \d+ failed/i, // Webpack chunk loading
        ];

        const errorMessage = event.exception.values?.[0]?.value || '';
        if (ignoredPatterns.some(pattern => pattern.test(errorMessage))) {
          return null;
        }
      }

      return event;
    },

    // Custom tags
    initialScope: {
      tags: {
        app: 'watchthis-frontend',
      },
    },
  });

  // Set user context (if authenticated)
  // Call this after user logs in
  // Sentry.setUser({ id: userId, email: userEmail });
}

/**
 * Capture custom event
 */
export function captureEvent(message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>) {
  Sentry.captureMessage(message, {
    level,
    contexts: context ? { custom: context } : undefined,
  });
}

/**
 * Capture exception with context
 */
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    contexts: context ? { custom: context } : undefined,
  });
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message,
    data,
    level: 'info',
  });
}

/**
 * Set user context
 */
export function setUser(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

/**
 * Clear user context (on logout)
 */
export function clearUser() {
  Sentry.setUser(null);
}

export default Sentry;

