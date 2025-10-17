import React, { useState, useEffect } from 'react';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  bookedDates?: Date[];
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  onSelectDate,
  bookedDates = []
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateBooked = (date: Date | null) => {
    if (!date) return false;
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() &&
      bookedDate.getMonth() === date.getMonth() &&
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: Date | null) => {
    if (!date || isPastDate(date) || isDateBooked(date)) return;
    onSelectDate(date);
  };

  const days = getDaysInMonth(currentMonth);

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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        {/* Previous Month Button */}
        <button
          onClick={goToPreviousMonth}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: '18px',
            color: '#1D1D1F'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F5F5F7';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ‹
        </button>

        {/* Month/Year Display */}
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#1D1D1F',
          letterSpacing: '-0.02em'
        }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>

        {/* Next Month Button */}
        <button
          onClick={goToNextMonth}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            fontSize: '18px',
            color: '#1D1D1F'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F5F5F7';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ›
        </button>
      </div>

      {/* Day Names */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px'
      }}>
        {dayNames.map(day => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 600,
              color: '#86868B',
              padding: '8px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px'
      }}>
        {days.map((date, index) => {
          const isDisabled = !date || isPastDate(date);
          const isBooked = isDateBooked(date);
          const isSelected = isDateSelected(date);
          const isTodayDate = isToday(date);
          const isHovered = hoveredDate && date && 
            hoveredDate.getDate() === date.getDate() &&
            hoveredDate.getMonth() === date.getMonth() &&
            hoveredDate.getFullYear() === date.getFullYear();

          let backgroundColor = '#FFFFFF';
          let color = '#1D1D1F';
          let border = 'none';
          let cursor = 'pointer';
          let opacity = 1;

          if (!date) {
            return <div key={index} />;
          }

          if (isDisabled || isBooked) {
            backgroundColor = '#F5F5F7';
            color = '#C7C7CC';
            cursor = 'not-allowed';
            opacity = 0.5;
          } else if (isSelected) {
            backgroundColor = 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)';
            color = '#FFFFFF';
          } else if (isTodayDate) {
            border = '2px solid #0071E3';
          }

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => !isDisabled && !isBooked && setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              disabled={isDisabled || isBooked}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '10px',
                border: border,
                backgroundImage: isSelected ? backgroundColor : 'none',
                backgroundColor: !isSelected ? backgroundColor : undefined,
                color: color,
                fontSize: '14px',
                fontWeight: isSelected || isTodayDate ? 600 : 400,
                cursor: cursor,
                opacity: opacity,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transform: isHovered && !isDisabled && !isBooked ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isSelected 
                  ? '0 4px 12px rgba(0, 113, 227, 0.3)' 
                  : isHovered && !isDisabled && !isBooked 
                    ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
                    : 'none'
              }}
            >
              {date.getDate()}
              {isBooked && (
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
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
            border: '2px solid #0071E3'
          }} />
          Today
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: '#F5F5F7'
          }} />
          Unavailable
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #0071E3 0%, #0088FF 100%)'
          }} />
          Selected
        </div>
      </div>
    </div>
  );
};

