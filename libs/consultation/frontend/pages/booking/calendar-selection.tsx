import React from 'react';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Video,
  Phone,
  MessageSquare,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BookingData } from './booking-flow';

interface CalendarSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  currentStep: number;
}

export const CalendarSelection: React.FC<CalendarSelectionProps> = ({
  bookingData,
  updateBookingData
}) => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(
    bookingData.dateTime?.date || null
  );
  const [selectedTime, setSelectedTime] = React.useState<string | null>(
    bookingData.dateTime?.time || null
  );
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = React.useState(
    bookingData.dateTime?.timezone || 'America/New_York'
  );
  const [preferredFormat, setPreferredFormat] = React.useState<'video' | 'phone' | 'chat'>(
    'video'
  );

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (EST)' },
    { value: 'America/Chicago', label: 'Central Time (CST)' },
    { value: 'America/Denver', label: 'Mountain Time (MST)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  // Mock availability data - in real app this would come from API
  const getAvailableSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    // Mock: weekends have limited availability
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return timeSlots.filter((_, index) => index % 3 === 0);
    }
    return timeSlots;
  };

  const availableSlots = selectedDate ? getAvailableSlots(new Date(selectedDate)) : timeSlots;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return selected.toDateString() === date.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      updateBookingData({
        dateTime: {
          date: selectedDate,
          time: time,
          timezone: selectedTimezone
        }
      });
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days: (Date | null)[] = getDaysInMonth(currentMonth);

  const isTimeSlotAvailable = (time: string) => {
    return availableSlots.includes(time);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'chat': return MessageSquare;
      default: return Video;
    }
  };

  const FormatIcon = getFormatIcon(preferredFormat);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text mb-4">
          Schedule Your Consultation
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Choose a convenient date and time for your consultation.
          We'll send you a calendar invite and reminder.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="enterprise-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Select Date</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-medium text-text">
                {currentMonth.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                disabled={!day}
                className={`p-3 text-center text-sm rounded-lg transition-all ${
                  day
                    ? isDateSelected(day)
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/10 text-text'
                    : 'text-muted cursor-not-allowed'
                }`}
              >
                {day?.getDate() ?? ''}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span className="text-muted">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span className="text-muted">Available</span>
              </div>
            </div>
            <div className="text-muted">
              {selectedDate && formatDate(new Date(selectedDate))}
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="enterprise-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text mb-2">Select Time</h3>
            <p className="text-sm text-muted">
              {selectedDate ? formatDate(new Date(selectedDate)) : 'Please select a date first'}
            </p>
          </div>

          {selectedDate && (
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {availableSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    selectedTime === time
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{time}</span>
                    {selectedTime === time && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!selectedDate && (
            <div className="flex items-center justify-center h-64 text-muted">
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a date to view available times</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timezone Selection */}
        <div className="enterprise-card p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Timezone</h3>
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="enterprise-form-input w-full"
          >
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-muted mt-2">
            All times are shown in your selected timezone
          </p>
        </div>

        {/* Preferred Format */}
        <div className="enterprise-card p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Preferred Format</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'video', label: 'Video Call', icon: Video },
              { value: 'phone', label: 'Phone Call', icon: Phone },
              { value: 'chat', label: 'Chat', icon: MessageSquare }
            ].map((format) => (
              <button
                key={format.value}
                onClick={() => setPreferredFormat(format.value as 'video' | 'phone' | 'chat')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  preferredFormat === format.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <format.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">{format.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Notice */}
      {bookingData.service && (
        <div className="enterprise-card p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-text">
                {bookingData.service.name}
              </h3>
              <p className="text-sm text-muted">
                Duration: {bookingData.service.duration} minutes •
                Price: ${bookingData.service.price}
              </p>
            </div>
            <div className="ml-auto">
              <FormatIcon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Selected Date/Time Summary */}
      {selectedDate && selectedTime && (
        <div className="enterprise-card p-6 bg-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-success-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text">Session Scheduled</h3>
                <p className="text-sm text-muted">
                  {formatDate(new Date(selectedDate))} at {selectedTime}
                </p>
                <p className="text-sm text-muted">
                  {preferredFormat === 'video' ? 'Video Call' :
                   preferredFormat === 'phone' ? 'Phone Call' : 'Chat Session'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-success">
                {timezones.find(tz => tz.value === selectedTimezone)?.label}
              </div>
              <div className="text-sm text-muted">Your timezone</div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="enterprise-card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-text mb-2">
          Need to reschedule or have questions?
        </h3>
        <p className="text-muted mb-6">
          You can always modify your booking details later or contact our support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="enterprise-btn enterprise-btn--outline">
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </button>
          <button className="enterprise-btn enterprise-btn--ghost">
            <Users className="w-4 h-4" />
            <span>Schedule Team Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarSelection;
