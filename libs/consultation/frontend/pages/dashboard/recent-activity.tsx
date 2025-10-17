import React from 'react';
import {
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle,
  Clock,
  Star,
  Users,
  Award,
  Video
} from 'lucide-react';

export const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'booking_confirmed',
      title: 'Consultation Confirmed',
      description: 'Digital Strategy session with Sarah Johnson',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'message_received',
      title: 'New Message',
      description: 'Michael Chen sent you a message about the architecture review',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      status: 'unread'
    },
    {
      id: 3,
      type: 'session_completed',
      title: 'Session Completed',
      description: 'Marketing Strategy consultation completed successfully',
      time: '1 day ago',
      icon: Award,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      status: 'completed'
    },
    {
      id: 4,
      type: 'document_shared',
      title: 'Document Shared',
      description: 'Project proposal document shared for review',
      time: '2 days ago',
      icon: FileText,
      color: 'text-info',
      bgColor: 'bg-info/10',
      status: 'pending'
    },
    {
      id: 5,
      type: 'upcoming_session',
      title: 'Upcoming Session',
      description: 'Technical Architecture consultation scheduled',
      time: '3 days ago',
      icon: Calendar,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      status: 'scheduled'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: 'Confirmed', className: 'enterprise-badge--success' },
      unread: { label: 'New', className: 'enterprise-badge--primary' },
      completed: { label: 'Completed', className: 'enterprise-badge--neutral' },
      pending: { label: 'Pending', className: 'enterprise-badge--warning' },
      scheduled: { label: 'Scheduled', className: 'enterprise-badge--info' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`enterprise-badge ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="enterprise-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text">Recent Activity</h3>
            <p className="text-sm text-muted">Latest updates and notifications</p>
          </div>
          <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-6 hover:bg-hover transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-6 h-6 ${activity.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text">{activity.title}</h4>
                  {getStatusBadge(activity.status)}
                </div>

                <p className="text-muted text-sm mb-3 leading-relaxed">
                  {activity.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>

                  {activity.type === 'session_completed' && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent" />
                      5.0 rating
                    </span>
                  )}

                  {activity.type === 'upcoming_session' && (
                    <span className="flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      Video Call
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="p-6 border-t border-border text-center">
        <button className="enterprise-btn enterprise-btn--outline">
          <span>Load More Activities</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
