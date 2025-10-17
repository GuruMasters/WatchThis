import React from 'react';
import {
  Bell,
  CheckCircle,
  X,
  Settings,
  Archive,
  Trash2,
  MoreVertical,
  Calendar,
  MessageSquare,
  Video,
  CreditCard,
  AlertTriangle,
  Info
} from 'lucide-react';
import { NotificationData, notificationService } from '../../services/notification';

interface NotificationCenterProps {
  userId: string;
  onClose?: () => void;
  isOpen?: boolean;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  userId,
  onClose,
  isOpen = true
}) => {
  const [notifications, setNotifications] = React.useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');

  React.useEffect(() => {
    const unsubscribeNotifications = notificationService.subscribeToNotifications(
      userId,
      (newNotifications) => {
        setNotifications(newNotifications);
        setIsLoading(false);
      }
    );

    const unsubscribeCount = notificationService.subscribeToUnreadCount(
      userId,
      (count) => {
        setUnreadCount(count);
      }
    );

    return () => {
      unsubscribeNotifications();
      unsubscribeCount();
    };
  }, [userId]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(userId);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      await notificationService.deleteAllRead(userId);
    } catch (error) {
      console.error('Error deleting read notifications:', error);
    }
  };

  const getNotificationIcon = (type: NotificationData['type']) => {
    switch (type) {
      case 'booking_confirmed':
      case 'booking_reminder':
        return Calendar;
      case 'booking_cancelled':
        return X;
      case 'message_received':
        return MessageSquare;
      case 'session_started':
      case 'session_ended':
        return Video;
      case 'payment_due':
        return CreditCard;
      case 'system_update':
        return Settings;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: NotificationData['type']) => {
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
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    return true;
  });

  const NotificationItem = ({ notification }: { notification: NotificationData }) => {
    const Icon = getNotificationIcon(notification.type);
    const colorClass = getNotificationColor(notification.type);

    return (
      <div
        className={`p-4 border-b border-border hover:bg-hover transition-colors ${
          !notification.read ? 'bg-primary/5' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl bg-${colorClass}/10 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 text-${colorClass}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-text text-sm">
                  {notification.title}
                </h4>
                <p className="text-sm text-muted mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted mt-2">
                  {notificationService.formatNotificationTime(notification.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 ml-2">
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="p-1 hover:bg-error/10 rounded transition-colors"
                  title="Delete notification"
                >
                  <X className="w-4 h-4 text-error" />
                </button>
              </div>
            </div>

            {/* Metadata */}
            {notification.data?.bookingId && (
              <div className="mt-2 p-2 bg-bg-secondary rounded-lg">
                <div className="text-xs text-muted">
                  Booking ID: {notification.data.bookingId}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-surface border border-border rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text">Notifications</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted">{unreadCount} unread</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-muted">{notifications.length} total</span>
            </span>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm"
          >
            Mark all read
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setFilter('all')}
            className={`enterprise-btn enterprise-btn--sm ${
              filter === 'all' ? 'enterprise-btn--primary' : 'enterprise-btn--outline'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`enterprise-btn enterprise-btn--sm ${
              filter === 'unread' ? 'enterprise-btn--primary' : 'enterprise-btn--outline'
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm text-muted">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted" />
            <h4 className="font-medium text-text mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h4>
            <p className="text-sm text-muted">
              {filter === 'unread'
                ? 'You\'re all caught up!'
                : 'Notifications will appear here when you have new updates.'
              }
            </p>
          </div>
        ) : (
          <div>
            {filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-border">
          <button
            onClick={handleDeleteAllRead}
            className="w-full enterprise-btn enterprise-btn--ghost enterprise-btn--sm text-error hover:bg-error/10"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete all read</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
