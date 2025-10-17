import React from 'react';
import {
  Calendar,
  MessageSquare,
  Users,
  FileText,
  Settings,
  Bell,
  CreditCard,
  Download,
  Star,
  Clock,
  Video,
  Phone,
  Plus,
  Search,
  Filter
} from 'lucide-react';

export const QuickActions: React.FC = () => {
  const primaryActions = [
    {
      name: 'Schedule New Consultation',
      description: 'Book a session with our experts',
      icon: Calendar,
      href: '/booking/new',
      color: 'from-primary to-primary-600',
      bgColor: 'bg-primary/10',
      urgent: false
    },
    {
      name: 'Send Message',
      description: 'Contact your consultant',
      icon: MessageSquare,
      href: '/messages/new',
      color: 'from-secondary to-secondary-600',
      bgColor: 'bg-secondary/10',
      urgent: false
    },
    {
      name: 'View My Sessions',
      description: 'See all your bookings',
      icon: Users,
      href: '/sessions',
      color: 'from-accent to-accent-600',
      bgColor: 'bg-accent/10',
      urgent: false
    },
    {
      name: 'Download Resources',
      description: 'Access guides and materials',
      icon: Download,
      href: '/resources',
      color: 'from-success to-success-600',
      bgColor: 'bg-success/10',
      urgent: false
    }
  ];

  const secondaryActions = [
    {
      name: 'Update Profile',
      icon: Settings,
      href: '/profile',
      description: 'Manage your account settings'
    },
    {
      name: 'Payment Methods',
      icon: CreditCard,
      href: '/billing',
      description: 'Manage payment options'
    },
    {
      name: 'Notifications',
      icon: Bell,
      href: '/notifications',
      description: 'Configure alerts and reminders'
    },
    {
      name: 'Help & Support',
      icon: FileText,
      href: '/help',
      description: 'Get assistance and documentation'
    }
  ];

  const recentConsultants = [
    {
      name: 'Sarah Johnson',
      role: 'Digital Strategy Expert',
      avatar: 'SJ',
      lastContact: '2 hours ago',
      status: 'online'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Architect',
      avatar: 'MC',
      lastContact: '1 day ago',
      status: 'away'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      avatar: 'ER',
      lastContact: '3 days ago',
      status: 'offline'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const ActionCard = ({ action, index }: { action: typeof primaryActions[0], index: number }) => (
    <a
      href={action.href}
      className="enterprise-card p-6 hover-lift animate-fade-in-up cursor-pointer block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
          <action.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-text mb-1">{action.name}</h3>
          <p className="text-sm text-muted">{action.description}</p>
        </div>
        {action.urgent && (
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
        )}
      </div>
    </a>
  );

  return (
    <div className="space-y-8">
      {/* Primary Actions */}
      <div>
        <h3 className="text-lg font-semibold text-text mb-4">Quick Actions</h3>
        <div className="space-y-4">
          {primaryActions.map((action, index) => (
            <ActionCard key={index} action={action} index={index} />
          ))}
        </div>
      </div>

      {/* Recent Consultants */}
      <div className="enterprise-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Recent Consultants</h3>
        <div className="space-y-4">
          {recentConsultants.map((consultant, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  {consultant.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(consultant.status)} rounded-full border-2 border-surface`}></div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text text-sm">{consultant.name}</h4>
                <p className="text-xs text-muted">{consultant.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">{consultant.lastContact}</p>
                <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm mt-1">
                  <MessageSquare className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Management */}
      <div className="enterprise-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Account</h3>
        <div className="space-y-3">
          {secondaryActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover transition-colors text-sm"
            >
              <action.icon className="w-4 h-4 text-muted" />
              <div className="flex-1">
                <div className="font-medium text-text">{action.name}</div>
                <div className="text-xs text-muted">{action.description}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="enterprise-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">System Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">All Systems Operational</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">Online</span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { service: 'Booking System', status: 'operational' },
              { service: 'Video Calls', status: 'operational' },
              { service: 'Messaging', status: 'operational' },
              { service: 'Notifications', status: 'operational' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted">{item.service}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-success font-medium capitalize">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help & Resources */}
      <div className="enterprise-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Need Help?</h3>
        <div className="space-y-3">
          <button className="w-full enterprise-btn enterprise-btn--outline p-4 h-auto flex items-center gap-3 justify-start">
            <FileText className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium text-text">Documentation</div>
              <div className="text-sm text-muted">User guides and tutorials</div>
            </div>
          </button>

          <button className="w-full enterprise-btn enterprise-btn--outline p-4 h-auto flex items-center gap-3 justify-start">
            <MessageSquare className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium text-text">Contact Support</div>
              <div className="text-sm text-muted">Get help from our team</div>
            </div>
          </button>

          <button className="w-full enterprise-btn enterprise-btn--outline p-4 h-auto flex items-center gap-3 justify-start">
            <Search className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium text-text">Search Knowledge Base</div>
              <div className="text-sm text-muted">Find answers quickly</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
