import React from 'react';
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  User,
  Mail,
  Download,
  Share,
  ArrowRight,
  MapPin,
  DollarSign
} from 'lucide-react';

export const BookingConfirmation: React.FC = () => {
  // Mock booking data - in real implementation, this would come from booking context/state
  const bookingData = {
    id: 'BK-2024-001',
    consultant: {
      name: 'Sarah Johnson',
      title: 'Senior Business Consultant',
      avatar: 'SJ',
      email: 'sarah.johnson@consultationpro.com'
    },
    service: {
      name: 'Business Strategy Consultation',
      duration: 60,
      price: 150,
      category: 'Business'
    },
    schedule: {
      date: '2024-01-20',
      time: '14:00',
      timezone: 'EST',
      meetingType: 'video' as const
    },
    project: {
      title: 'E-commerce Website Redesign',
      description: 'Complete overhaul of our online store to improve user experience and conversion rates.',
      goals: 'Increase conversion rate by 30%, improve mobile experience, implement modern design system.'
    },
    client: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      company: 'Tech Solutions Inc.'
    }
  };

  const handleDownloadConfirmation = () => {
    // In real implementation, this would generate and download a PDF
    console.log('Downloading confirmation...');
  };

  const handleAddToCalendar = () => {
    // In real implementation, this would integrate with calendar services
    console.log('Adding to calendar...');
  };

  const handleShareBooking = () => {
    // In real implementation, this would open sharing options
    console.log('Sharing booking...');
  };

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-primary" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-secondary" />;
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-accent" />;
      default:
        return <Video className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="py-8">
      <div className="container-max">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center animate-bounce-gentle">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Your consultation has been successfully booked. You'll receive a confirmation email shortly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Booking Summary */}
          <div className="enterprise-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">Booking Summary</h2>
                <p className="text-muted">Booking ID: {bookingData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Consultant Info */}
              <div>
                <h3 className="font-semibold text-text mb-4">Your Consultant</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                    <span className="text-white font-bold">{bookingData.consultant.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text">{bookingData.consultant.name}</h4>
                    <p className="text-muted">{bookingData.consultant.title}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted" />
                    <span className="text-muted">{bookingData.consultant.email}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div>
                <h3 className="font-semibold text-text mb-4">Schedule Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-text">
                        {new Date(bookingData.schedule.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-muted">
                        {bookingData.schedule.time} {bookingData.schedule.timezone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-text">{bookingData.service.duration} minutes</div>
                      <div className="text-sm text-muted">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getMeetingIcon(bookingData.schedule.meetingType)}
                    <div>
                      <div className="font-medium text-text capitalize">
                        {bookingData.schedule.meetingType} Call
                      </div>
                      <div className="text-sm text-muted">Meeting Type</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-text mb-4">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="font-medium text-text">{bookingData.service.name}</div>
                  <div className="text-sm text-muted">{bookingData.service.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium text-text">${bookingData.service.price}</div>
                    <div className="text-sm text-muted">per hour</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <div>
                    <div className="font-medium text-text">Confirmed</div>
                    <div className="text-sm text-muted">Status</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold text-text mb-4">Project Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-text mb-2">{bookingData.project.title}</h4>
                  <p className="text-muted">{bookingData.project.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-2">Goals & Objectives</h4>
                  <p className="text-muted">{bookingData.project.goals}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="enterprise-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">What's Next?</h2>
                <p className="text-muted">Prepare for your consultation session</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-text mb-2">Check Your Email</h3>
                <p className="text-sm text-muted">
                  You'll receive a confirmation email with meeting details and preparation instructions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-text mb-2">Add to Calendar</h3>
                <p className="text-sm text-muted">
                  Add the consultation to your calendar to receive reminders and notifications.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-text mb-2">Prepare Questions</h3>
                <p className="text-sm text-muted">
                  Prepare any specific questions or topics you'd like to discuss during the session.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="enterprise-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text">Download & Share</h2>
                <p className="text-muted">Keep a record of your booking confirmation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleDownloadConfirmation}
                className="enterprise-btn enterprise-btn--outline enterprise-btn--lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
              <button
                onClick={handleAddToCalendar}
                className="enterprise-btn enterprise-btn--outline enterprise-btn--lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Add to Calendar
              </button>
              <button
                onClick={handleShareBooking}
                className="enterprise-btn enterprise-btn--outline enterprise-btn--lg"
              >
                <Share className="w-5 h-5 mr-2" />
                Share Booking
              </button>
            </div>
          </div>

          {/* Support Info */}
          <div className="enterprise-card p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text mb-4">Need Help?</h3>
              <p className="text-muted mb-6">
                If you have any questions about your booking or need to make changes, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="enterprise-btn enterprise-btn--outline enterprise-btn--lg">
                  Contact Support
                </button>
                <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--lg">
                  View Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
