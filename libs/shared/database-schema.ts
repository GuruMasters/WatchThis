// Database Schema for Firebase Firestore
// This file defines the structure of all collections and documents

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  role: 'client' | 'consultant' | 'admin';
  avatar?: string;
  bio?: string;
  specialties?: string[];
  hourlyRate?: number;
  availability?: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    workingDays: number[]; // 0-6 (Sunday-Saturday)
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  preferences?: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    timezone: string;
    language: string;
  };
}

export interface ConsultantProfile extends UserProfile {
  role: 'consultant';
  specialties: string[];
  hourlyRate: number;
  availability: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    workingDays: number[];
  };
  rating: number;
  totalReviews: number;
  responseTime: string;
  completedProjects: number;
  certifications?: string[];
  portfolio?: string[];
}

export interface Booking {
  id: string;
  clientId: string;
  consultantId: string;
  serviceId: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  scheduledAt: Date;
  duration: number; // in minutes
  price: number;
  currency: string;
  meetingType: 'video' | 'phone' | 'chat' | 'in_person';
  meetingLink?: string;
  notes?: string;
  requirements?: string;
  goals?: string;
  budget?: number;
  urgency: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  cancelledAt?: Date;
  completedAt?: Date;
  feedback?: {
    rating: number;
    comment: string;
    submittedAt: Date;
  };
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  timestamp: Date;
  read: boolean;
  readBy: string[];
  metadata?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    imageWidth?: number;
    imageHeight?: number;
  };
}

export interface ChatConversation {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  participantAvatars?: { [userId: string]: string };
  lastMessage?: ChatMessage;
  lastMessageTime: Date;
  unreadCount: { [userId: string]: number };
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived' | 'deleted';
  metadata?: {
    bookingId?: string;
    consultantId?: string;
    clientId?: string;
    sessionType?: string;
  };
}

export interface NotificationData {
  id: string;
  userId: string;
  type: 'booking_confirmed' | 'booking_reminder' | 'booking_cancelled' | 'message_received' | 'session_started' | 'session_ended' | 'payment_due' | 'system_update';
  title: string;
  message: string;
  data?: {
    bookingId?: string;
    sessionId?: string;
    messageId?: string;
    consultantId?: string;
    clientId?: string;
    [key: string]: any;
  };
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  features: string[];
  requirements?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  consultantId: string;
  rating: number;
  comment: string;
  isPublic: boolean;
  createdAt: Date;
  consultantResponse?: string;
  responseAt?: Date;
}

export interface AvailabilitySlot {
  id: string;
  consultantId: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isBooked: boolean;
  bookingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  clientId: string;
  consultantId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'invoice';
  stripePaymentIntentId?: string;
  paypalTransactionId?: string;
  invoiceId?: string;
  createdAt: Date;
  completedAt?: Date;
  refundedAt?: Date;
  metadata?: {
    discountCode?: string;
    discountAmount?: number;
    taxAmount?: number;
  };
}

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventType: 'page_view' | 'booking_created' | 'message_sent' | 'consultation_completed' | 'payment_made';
  eventData: {
    [key: string]: any;
  };
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  sessionId?: string;
}

export interface SystemSettings {
  id: string;
  key: string;
  value: any;
  description?: string;
  updatedAt: Date;
  updatedBy: string;
}

// Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  CONSULTANTS: 'consultants',
  BOOKINGS: 'bookings',
  MESSAGES: 'messages',
  CONVERSATIONS: 'conversations',
  NOTIFICATIONS: 'notifications',
  SERVICES: 'services',
  REVIEWS: 'reviews',
  AVAILABILITY: 'availability',
  PAYMENTS: 'payments',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
  COUNTERS: 'counters',
  HEALTH: 'health'
} as const;

// Document IDs for settings
export const SETTING_DOCS = {
  SYSTEM_CONFIG: 'system_config',
  NOTIFICATION_SETTINGS: 'notification_settings',
  PAYMENT_SETTINGS: 'payment_settings',
  INTEGRATION_SETTINGS: 'integration_settings'
} as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  system: {
    maintenanceMode: false,
    allowRegistrations: true,
    maxBookingAdvanceDays: 90,
    defaultTimezone: 'America/New_York',
    businessHours: {
      start: '09:00',
      end: '18:00'
    },
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
  },
  notifications: {
    emailEnabled: true,
    pushEnabled: true,
    smsEnabled: false,
    reminderTiming: '30min'
  },
  payments: {
    currency: 'USD',
    taxRate: 0.1,
    stripeEnabled: true,
    paypalEnabled: false,
    invoiceEnabled: true
  }
};
