import React from 'react';
import { Bell } from 'lucide-react';
import { notificationService } from '../../services/notification';

interface NotificationBadgeProps {
  userId: string;
  onClick?: () => void;
  showCount?: boolean;
  maxCount?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  userId,
  onClick,
  showCount = true,
  maxCount = 99
}) => {
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = notificationService.subscribeToUnreadCount(
      userId,
      (count) => {
        setUnreadCount(count);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  if (isLoading) {
    return (
      <button
        onClick={onClick}
        className="enterprise-btn enterprise-btn--ghost p-2 relative"
        disabled
      >
        <Bell className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="enterprise-btn enterprise-btn--ghost p-2 relative"
      title={`${unreadCount} unread notifications`}
    >
      <Bell className="w-5 h-5" />

      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
          {showCount && unreadCount <= maxCount ? unreadCount : `${maxCount}+`}
        </div>
      )}

      {/* Pulse animation for new notifications */}
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-error rounded-full animate-ping opacity-75"></div>
      )}
    </button>
  );
};

export default NotificationBadge;
