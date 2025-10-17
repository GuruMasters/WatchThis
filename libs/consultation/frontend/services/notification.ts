import { collection, addDoc, query, orderBy, onSnapshot, where, updateDoc, doc, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../../shared/firebase-config/src/index';

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
  readAt?: Timestamp;
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  bookingReminders: boolean;
  messageNotifications: boolean;
  marketingEmails: boolean;
  systemUpdates: boolean;
  reminderTiming: '15min' | '30min' | '1hour' | '1day';
}

export class NotificationService {
  private static instance: NotificationService;
  private notificationListeners: Map<string, () => void> = new Map();
  private preferencesListeners: Map<string, () => void> = new Map();

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Notification CRUD Operations
  async createNotification(
    userId: string,
    type: NotificationData['type'],
    title: string,
    message: string,
    data?: any
  ): Promise<string> {
    try {
      const notificationData = {
        userId,
        type,
        title,
        message,
        data: data || {},
        read: false,
        createdAt: new Timestamp(Math.floor(Date.now() / 1000), 0),
        expiresAt: new Timestamp(Math.floor((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000), 0) // 30 days from now
      };

      const docRef = await addDoc(collection(db, 'notifications'), notificationData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new Error('Failed to create notification');
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        readAt: new Timestamp(Math.floor(Date.now() / 1000), 0)
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Failed to mark notification as read');
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    try {
      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        where('read', '==', false)
      );

      // This would be better implemented as a cloud function for bulk operations
      // For now, we'll handle it client-side
      console.log('Marking all notifications as read for user:', userId);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw new Error('Failed to mark all notifications as read');
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      // Note: In a real app, you might want to soft delete or archive instead
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true,
        expiresAt: new Timestamp(Math.floor(Date.now() / 1000), 0) // Expire immediately
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw new Error('Failed to delete notification');
    }
  }

  async deleteAllRead(userId: string): Promise<void> {
    try {
      // This would be better implemented as a cloud function
      console.log('Deleting all read notifications for user:', userId);
    } catch (error) {
      console.error('Error deleting read notifications:', error);
      throw new Error('Failed to delete read notifications');
    }
  }

  // Notification Preferences
  async getNotificationPreferences(userId: string): Promise<NotificationPreferences | null> {
    try {
      // This would typically be stored in a user preferences collection
      const defaultPreferences: NotificationPreferences = {
        userId,
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        bookingReminders: true,
        messageNotifications: true,
        marketingEmails: false,
        systemUpdates: true,
        reminderTiming: '30min'
      };

      return defaultPreferences;
    } catch (error) {
      console.error('Error getting notification preferences:', error);
      return null;
    }
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>
  ): Promise<void> {
    try {
      // This would typically update a user preferences document
      console.log('Updating notification preferences for user:', userId, preferences);
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw new Error('Failed to update notification preferences');
    }
  }

  // Real-time Listeners
  subscribeToNotifications(
    userId: string,
    callback: (notifications: NotificationData[]) => void
  ): () => void {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notifications: NotificationData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NotificationData));

      callback(notifications);
    });

    this.notificationListeners.set(userId, unsubscribe);
    return unsubscribe;
  }

  subscribeToUnreadCount(
    userId: string,
    callback: (count: number) => void
  ): () => void {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      callback(snapshot.size);
    });

    return unsubscribe;
  }

  // Notification Creation Helpers
  async createBookingNotification(
    userId: string,
    bookingId: string,
    type: 'confirmed' | 'reminder' | 'cancelled',
    consultantName: string,
    sessionDate: string
  ): Promise<void> {
    const notifications = {
      confirmed: {
        title: 'Booking Confirmed',
        message: `Your consultation with ${consultantName} on ${sessionDate} has been confirmed.`,
        type: 'booking_confirmed' as const
      },
      reminder: {
        title: 'Upcoming Consultation',
        message: `Your consultation with ${consultantName} is starting soon on ${sessionDate}.`,
        type: 'booking_reminder' as const
      },
      cancelled: {
        title: 'Booking Cancelled',
        message: `Your consultation with ${consultantName} on ${sessionDate} has been cancelled.`,
        type: 'booking_cancelled' as const
      }
    };

    const notification = notifications[type];
    await this.createNotification(
      userId,
      notification.type,
      notification.title,
      notification.message,
      { bookingId }
    );
  }

  async createMessageNotification(
    userId: string,
    senderName: string,
    messagePreview: string,
    conversationId: string
  ): Promise<void> {
    await this.createNotification(
      userId,
      'message_received',
      'New Message',
      `${senderName}: ${messagePreview}`,
      { conversationId }
    );
  }

  async createSessionNotification(
    userId: string,
    sessionId: string,
    type: 'started' | 'ended',
    consultantName: string
  ): Promise<void> {
    const notifications = {
      started: {
        title: 'Session Started',
        message: `Your consultation session with ${consultantName} has started.`,
        type: 'session_started' as const
      },
      ended: {
        title: 'Session Ended',
        message: `Your consultation session with ${consultantName} has ended.`,
        type: 'session_ended' as const
      }
    };

    const notification = notifications[type];
    await this.createNotification(
      userId,
      notification.type,
      notification.title,
      notification.message,
      { sessionId }
    );
  }

  async createPaymentNotification(
    userId: string,
    amount: number,
    dueDate: string
  ): Promise<void> {
    await this.createNotification(
      userId,
      'payment_due',
      'Payment Due',
      `Your payment of $${amount} is due on ${dueDate}.`,
      {}
    );
  }

  async createSystemNotification(
    userId: string,
    title: string,
    message: string
  ): Promise<void> {
    await this.createNotification(
      userId,
      'system_update',
      title,
      message,
      {}
    );
  }

  // Cleanup
  unsubscribeFromNotifications(userId: string): void {
    const unsubscribe = this.notificationListeners.get(userId);
    if (unsubscribe) {
      unsubscribe();
      this.notificationListeners.delete(userId);
    }
  }

  // Utility functions
  getNotificationIcon(type: NotificationData['type']) {
    switch (type) {
      case 'booking_confirmed':
      case 'booking_reminder':
        return '📅';
      case 'booking_cancelled':
        return '❌';
      case 'message_received':
        return '💬';
      case 'session_started':
        return '🎥';
      case 'session_ended':
        return '✅';
      case 'payment_due':
        return '💳';
      case 'system_update':
        return '🔧';
      default:
        return '📢';
    }
  }

  getNotificationColor(type: NotificationData['type']) {
    switch (type) {
      case 'booking_confirmed':
        return 'success';
      case 'booking_reminder':
        return 'primary';
      case 'booking_cancelled':
        return 'error';
      case 'message_received':
        return 'info';
      case 'session_started':
        return 'accent';
      case 'session_ended':
        return 'success';
      case 'payment_due':
        return 'warning';
      case 'system_update':
        return 'secondary';
      default:
        return 'muted';
    }
  }

  formatNotificationTime(timestamp: Timestamp) {
    const date = timestamp.toDate();
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return date.toLocaleDateString();
  }
}

export const notificationService = NotificationService.getInstance();
