import React, { useState } from 'react';

interface CustomTimePickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  bookedTimes?: string[];
  selectedDate: Date | null;
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  selectedTime,
  onSelectTime,
  bookedTimes = [],
  selectedDate
}) => {
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Generate time slots from 9:00 AM to 6:00 PM (30-minute intervals)
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute > 0) break; // Stop at 6:00 PM
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const isTimeBooked = (time: string) => {
    return bookedTimes.includes(time);
  };

  const isTimeSelected = (time: string) => {
    return selectedTime === time;
  };

  const isPastTime = (time: string) => {
    if (!selectedDate) return false;
    
    const today = new Date();
    const isToday = 
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();
    
    if (!isToday) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    return slotTime < today;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleTimeClick = (time: string) => {
    if (isPastTime(time) || isTimeBooked(time)) return;
    onSelectTime(time);
  };

  if (!selectedDate) {
    return (
      <div style={{
        backgroundColor: '#F5F5F7',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        maxWidth: '400px',
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{
          fontSize: '40px',
          marginBottom: '12px'
        }}>📅</div>
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#1D1D1F',
          marginBottom: '8px'
        }}>
          Select a Date First
        </div>
        <div style={{
          fontSize: '14px',
          color: '#86868B',
          lineHeight: 1.5
        }}>
          Please choose a date from the calendar to see available time slots
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      maxWidth: '400px',
      width: '100%'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#1D1D1F',
          marginBottom: '4px',
          letterSpacing: '-0.02em'
        }}>
          Select Time
        </div>
        <div style={{
          fontSize: '13px',
          color: '#86868B'
        }}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        maxHeight: '400px',
        overflowY: 'auto',
        paddingRight: '4px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#C7C7CC #F5F5F7'
      }}>
        {timeSlots.map((time) => {
          const isDisabled = isPastTime(time);
          const isBooked = isTimeBooked(time);
          const isSelected = isTimeSelected(time);
          const isHovered = hoveredTime === time;

          let backgroundColor = '#FFFFFF';
          let color = '#1D1D1F';
          let border = '1px solid rgba(0, 0, 0, 0.1)';
          let cursor = 'pointer';
          let opacity = 1;

          if (isDisabled || isBooked) {
            backgroundColor = '#F5F5F7';
            color = '#C7C7CC';
            cursor = 'not-allowed';
            opacity = 0.5;
          } else if (isSelected) {
            backgroundColor = 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)';
            color = '#FFFFFF';
            border = 'none';
          } else if (isHovered) {
            backgroundColor = '#F5F5F7';
          }

          return (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              onMouseEnter={() => !isDisabled && !isBooked && setHoveredTime(time)}
              onMouseLeave={() => setHoveredTime(null)}
              disabled={isDisabled || isBooked}
              style={{
                padding: '12px 8px',
                borderRadius: '10px',
                border: border,
                backgroundImage: isSelected ? backgroundColor : 'none',
                backgroundColor: !isSelected ? backgroundColor : undefined,
                color: color,
                fontSize: '13px',
                fontWeight: isSelected ? 600 : 500,
                cursor: cursor,
                opacity: opacity,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                position: 'relative',
                transform: isHovered && !isDisabled && !isBooked ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isSelected 
                  ? '0 4px 12px rgba(0, 113, 227, 0.3)' 
                  : isHovered && !isDisabled && !isBooked 
                    ? '0 2px 8px rgba(0, 0, 0, 0.08)' 
                    : 'none'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600 }}>
                {formatTime(time)}
              </span>
              {isBooked && (
                <span style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#EF4444'
                }}>
                  Booked
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Footer */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        fontSize: '12px',
        color: '#86868B'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)'
          }} />
          Selected
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: '#F5F5F7'
          }} />
          Booked
        </div>
      </div>
    </div>
  );
};

