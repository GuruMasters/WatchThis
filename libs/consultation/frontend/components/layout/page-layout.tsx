import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { emailService } from '../../../../../consultation-frontend/src/services/emailService';
import { EMAIL_CONFIG } from '../../../../../consultation-frontend/src/config/email';
import { MainNavigation } from './main-navigation';
import { Button } from '../ui/button';
import { Watermark } from '../ui/Watermark';
import {
  Home,
  Settings,
  Info,
  LogIn,
  MessageSquare,
  Sparkles,
  Users,
  ChevronDown,
  ChevronRight,
  Heart,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  BookOpen,
  Shield,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  Award,
  Video,
  Headphones
} from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  navigationItems?: NavigationItem[];
}

interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    icon: Settings
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    icon: Info
  },
  {
    id: 'faq',
    label: 'FAQ',
    href: '/faq',
    icon: MessageSquare
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: Phone
  }
];

const footerLinks = {
  'Services': [
    { name: 'Application Development', href: '/services/application-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'Business Consulting', href: '/services/business-consulting' },
    { name: 'Support & Maintenance', href: '/services/support-maintenance' }
  ],
  'Company': [
    { name: 'About Us', href: '/about/about-us' },
    { name: 'Our Team', href: '/about/our-team' },
    { name: 'Case Studies', href: '/about/case-studies' },
    { name: 'Blog', href: '/about/blog' },
    { name: 'Careers', href: '/about/careers' }
  ],
  'Resources': [
    { name: 'Documentation', href: '/resources/documentation' },
    { name: 'API Reference', href: '/resources/api-reference' },
    { name: 'Help Center', href: '/resources/help-center' },
    { name: 'Community', href: '/resources/community' }
  ],
  'Legal': [
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Terms of Service', href: '/legal/terms-of-service' },
    { name: 'Cookie Policy', href: '/legal/cookie-policy' },
    { name: 'GDPR', href: '/legal/gdpr' }
  ]
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  showNavigation = true,
  navigationItems = defaultNavigationItems
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const location = useLocation();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when route changes (only on initial load)
  useEffect(() => {
    // Only scroll to top on initial load, not on every route change
    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = newsletterEmail.trim();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNewsletterMessage({
        type: 'error',
        text: 'Please enter a valid email address.'
      });
      setTimeout(() => {
        setNewsletterMessage(null);
      }, 5000);
      return;
    }

    setIsSubmittingNewsletter(true);
    setNewsletterMessage(null);

    try {
      const response = await fetch('http://localhost:3088/email/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setNewsletterMessage({
        type: 'success',
        text: result.message || 'Successfully subscribed to newsletter!'
      });
      setNewsletterEmail('');

      // Send confirmation email
      await emailService.sendNewsletterConfirmationEmail(email);

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setNewsletterMessage(null);
      }, 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterMessage({
        type: 'error',
        text: 'Failed to subscribe. Please try again.'
      });

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setNewsletterMessage(null);
      }, 5000);
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const Header = () => (
    <MainNavigation />
  );

  const Footer = () => (
    <footer style={{
      position: 'relative',
      width: '100%',
      background: '#111111',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: 'clamp(20px, 4vw, 30px) 0'
    }}>
      {/* Watermark */}
      <Watermark text="WatchThis" color="yellow" rotation={-8} opacity={0.04} />

      {/* Footer Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 md:gap-6 lg:gap-8 w-full">
          {/* Left Section - Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FBC314] to-[#EFAF13] rounded-md blur opacity-30"></div>
                <div className="relative w-6 h-6 bg-gradient-to-r from-[#FBC314] to-[#EFAF13] rounded-md flex items-center justify-center shadow-glow">
                  <Sparkles className="w-3 h-3 text-black" />
                </div>
              </div>
              <span className="text-sm sm:text-base font-semibold text-white">WatchThis</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-300">
              © 2024 WatchThis. All rights reserved.
            </div>
          </div>

          {/* Newsletter (center column on lg) */}
          <div className="w-full flex justify-center lg:justify-center">
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full max-w-[400px] px-2 sm:px-0">
              <input
                type="email"
                placeholder="Enter email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="px-3 py-2 text-xs sm:text-sm rounded-lg bg-white text-[#111111] placeholder-gray-500 flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-[#0081C5]"
              />
              <Button
                type="submit"
                size="sm"
                variant="primary"
                loading={isSubmittingNewsletter}
                style={{ borderRadius: '12px', flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </form>
        </div>

          {/* Social Links (right column) */}
          <div className="w-full flex items-center justify-center md:justify-end gap-2.5 sm:gap-3 md:gap-4">
            {[
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                ),
                href: '#',
                gradient: 'from-blue-600 to-blue-700',
                label: 'Facebook'
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l18 18M21 3L3 21"/>
                  </svg>
                ),
                href: '#',
                gradient: 'from-neutral-700 to-black',
                label: 'X'
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                ),
                href: '#',
                gradient: 'from-pink-600 to-purple-700',
                label: 'Instagram'
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                    <path d="m10 15 5-3-5-3z"/>
                  </svg>
                ),
                href: '#',
                gradient: 'from-red-600 to-red-700',
                label: 'YouTube'
              }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gradient-to-r ${social.gradient} flex items-center justify-center text-white transition-all duration-200 hover:scale-110`}
                title={social.label}
                >
                {social.icon}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: showNavigation
        ? `linear-gradient(to bottom,
            #0081C5 0%,
            #0081C5 42%,
            #111111 42%,
            #111111 52%,
            #FBC314 52%,
            #FBC314 100%)`
        : 'linear-gradient(to bottom right, #f9fafb, white, #f9fafb)'
    }}>
      {showNavigation && <Header />}

      <main style={{
        flex: '1',
        paddingTop: showNavigation ? '96px' : '0',
        background: showNavigation ? 'transparent' : 'linear-gradient(to bottom right, #f9fafb, white, #f9fafb)'
      }}>
        {title && (
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px 32px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                fontWeight: '900',
                color: '#111111',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                {title}
              </h1>
              {description && (
                <p style={{
                  fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                  color: '#6b7280',
                  maxWidth: '768px',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}>
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </main>

      {showNavigation && <Footer />}
    </div>
  );
};

export default PageLayout;

