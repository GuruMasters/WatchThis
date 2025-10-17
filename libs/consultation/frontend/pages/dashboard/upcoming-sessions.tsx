import React from 'react';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  MapPin,
  Users,
  FileText,
  ExternalLink,
  Play
} from 'lucide-react';

export const UpcomingSessions: React.FC = () => {
  const sessions = [
    {
      id: 1,
      consultant: 'Sarah Johnson',
      consultantRole: 'Digital Strategy Expert',
      consultantAvatar: 'SJ',
      type: 'Digital Strategy Consultation',
      date: 'Today',
      time: '2:00 PM - 3:00 PM',
      duration: '60 minutes',
      format: 'video',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      agenda: [
        'Current digital presence assessment',
        'Growth opportunities discussion',
        'Action plan development',
        'Next steps and timeline'
      ],
      preparation: [
        'Review current marketing materials',
        'Prepare questions about target audience',
        'Have access to current analytics data'
      ]
    },
    {
      id: 2,
      consultant: 'Michael Chen',
      consultantRole: 'Technical Architect',
      consultantAvatar: 'MC',
      type: 'System Architecture Review',
      date: 'Tomorrow',
      time: '10:00 AM - 11:30 AM',
      duration: '90 minutes',
      format: 'video',
      status: 'confirmed',
      meetingLink: 'https://zoom.us/j/123456789',
      agenda: [
        'Current system architecture review',
        'Scalability assessment',
        'Security considerations',
        'Technology recommendations'
      ],
      preparation: [
        'Current system documentation',
        'Performance metrics',
        'Future growth projections'
      ]
    },
    {
      id: 3,
      consultant: 'Emily Rodriguez',
      consultantRole: 'Marketing Director',
      consultantAvatar: 'ER',
      type: 'Campaign Strategy Session',
      date: 'Friday',
      time: '3:30 PM - 4:30 PM',
      duration: '60 minutes',
      format: 'phone',
      status: 'pending',
      meetingLink: null,
      agenda: [
        'Q4 marketing campaign planning',
        'Budget allocation discussion',
        'Channel strategy review',
        'Performance metrics setup'
      ],
      preparation: [
        'Q3 performance reports',
        'Budget proposals',
        'Target audience insights'
      ]
    }
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'chat': return MessageSquare;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'cancelled': return 'text-error';
      default: return 'text-muted';
    }
  };

  const SessionCard = ({ session, index }: { session: typeof sessions[0], index: number }) => {
    const FormatIcon = getFormatIcon(session.format);

    return (
      <div
        className="enterprise-card p-6 hover-lift animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
              {session.consultantAvatar}
            </div>
            <div>
              <h3 className="font-semibold text-text">{session.consultant}</h3>
              <p className="text-sm text-muted">{session.consultantRole}</p>
              <div className="flex items-center gap-2 mt-1">
                <FormatIcon className="w-4 h-4 text-muted" />
                <span className="text-sm text-muted capitalize">{session.format} call</span>
              </div>
            </div>
          </div>
          <span className={`enterprise-badge enterprise-badge--${session.status === 'confirmed' ? 'success' : 'warning'}`}>
            {session.status}
          </span>
        </div>

        {/* Session Details */}
        <div className="mb-6">
          <h4 className="font-medium text-text mb-2">{session.type}</h4>
          <div className="space-y-2 text-sm text-muted">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{session.time} ({session.duration})</span>
            </div>
          </div>
        </div>

        {/* Agenda */}
        <div className="mb-6">
          <h5 className="font-medium text-text mb-3">Agenda</h5>
          <ul className="space-y-2">
            {session.agenda.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preparation */}
        <div className="mb-6">
          <h5 className="font-medium text-text mb-3">Preparation</h5>
          <ul className="space-y-2">
            {session.preparation.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <FileText className="w-4 h-4 text-muted mt-0.5 flex-shrink-0" />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-border">
          {session.meetingLink ? (
            <button className="enterprise-btn enterprise-btn--primary enterprise-btn--sm flex-1">
              <Play className="w-4 h-4" />
              <span>Join Meeting</span>
            </button>
          ) : (
            <button className="enterprise-btn enterprise-btn--outline enterprise-btn--sm flex-1">
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>
          )}

          <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
            <MessageSquare className="w-4 h-4" />
            <span>Message</span>
          </button>

          <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
            <ExternalLink className="w-4 h-4" />
            <span>Details</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="enterprise-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text">Upcoming Sessions</h3>
            <p className="text-sm text-muted">Your scheduled consultations</p>
          </div>
          <button className="enterprise-btn enterprise-btn--outline enterprise-btn--sm">
            <Calendar className="w-4 h-4" />
            <span>View Calendar</span>
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {sessions.map((session, index) => (
          <div key={session.id} className="p-6">
            <SessionCard session={session} index={index} />
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="p-6 border-t border-border bg-bg-secondary">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{sessions.length}</div>
            <div className="text-sm text-muted">This Week</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">
              {sessions.filter(s => s.status === 'confirmed').length}
            </div>
            <div className="text-sm text-muted">Confirmed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {sessions.reduce((acc, s) => {
                const hours = parseInt(s.duration.split(' ')[0]);
                return acc + hours;
              }, 0)}h
            </div>
            <div className="text-sm text-muted">Total Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessions;
