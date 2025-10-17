import React from 'react';
import {
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  Star,
  Users,
  Award,
  Target,
  Zap
} from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Sessions',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      description: 'Completed consultations',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+25%',
      trend: 'up',
      icon: Target,
      description: 'Ongoing collaborations',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Messages',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: MessageSquare,
      description: 'This month',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg Rating',
      value: '4.9',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      description: 'Out of 5 stars',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => (
    <div
      className="enterprise-dashboard-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="enterprise-dashboard-card__header">
        <div className="enterprise-dashboard-card__title">{stat.title}</div>
        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
          <stat.icon className={`w-6 h-6 ${stat.color}`} />
        </div>
      </div>

      <div className="enterprise-dashboard-card__metric">{stat.value}</div>

      <div className="enterprise-dashboard-card__change flex items-center gap-1">
        {stat.trend === 'up' && <TrendingUp className="w-3 h-3 text-success" />}
        <span className={stat.trend === 'up' ? 'text-success' : 'text-error'}>
          {stat.change}
        </span>
        <span className="text-muted">{stat.description}</span>
      </div>
    </div>
  );

  const upcomingSessions = [
    {
      consultant: 'Sarah Johnson',
      type: 'Digital Strategy',
      time: 'Today, 2:00 PM',
      duration: '60 min',
      status: 'confirmed'
    },
    {
      consultant: 'Michael Chen',
      type: 'Technical Architecture',
      time: 'Tomorrow, 10:00 AM',
      duration: '90 min',
      status: 'confirmed'
    }
  ];

  const recentMessages = [
    {
      from: 'Sarah Johnson',
      message: 'The strategy document is ready for review...',
      time: '2 hours ago',
      unread: true
    },
    {
      from: 'Consultation Pro Team',
      message: 'Your monthly report is available...',
      time: '1 day ago',
      unread: false
    },
    {
      from: 'Michael Chen',
      message: 'Architecture review completed...',
      time: '2 days ago',
      unread: false
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {/* Stats Cards */}
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}

      {/* Quick Overview Cards */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Upcoming Sessions</h3>
            <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  {session.consultant.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text">{session.consultant}</h4>
                  <p className="text-sm text-muted">{session.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text">{session.time}</p>
                  <p className="text-xs text-muted">{session.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Recent Messages</h3>
            <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-bg-secondary">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-600 flex items-center justify-center text-white font-bold text-sm">
                  {message.from.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-text">{message.from}</h4>
                    {message.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-muted truncate">{message.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
