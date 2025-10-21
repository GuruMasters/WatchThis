// Booking Service - manages booked appointments
// In production, this would connect to a real backend/database

interface Booking {
  date: Date;
  time: string;
  email: string;
  name: string;
}

class BookingService {
  private storageKey = 'watchthis_bookings';

  // Get all bookings from localStorage
  private getBookings(): Booking[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];
      
      const bookings = JSON.parse(stored);
      // Convert date strings back to Date objects
      return bookings.map((b: any) => ({
        ...b,
        date: new Date(b.date)
      }));
    } catch (error) {
      console.error('Error loading bookings:', error);
      return [];
    }
  }

  // Save bookings to localStorage
  private saveBookings(bookings: Booking[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  }

  // Get fully booked dates (dates where ALL time slots are booked)
  getBookedDates(): Date[] {
    const bookings = this.getBookings();
    const dateMap = new Map<string, number>();
    const dateObjects = new Map<string, Date>();
    
    // Count bookings per date
    bookings.forEach(booking => {
      const dateKey = booking.date.toDateString();
      dateMap.set(dateKey, (dateMap.get(dateKey) || 0) + 1);
      if (!dateObjects.has(dateKey)) {
        dateObjects.set(dateKey, booking.date);
      }
    });
    
    // Total available slots per day (9:00 - 18:00, 30-minute intervals = 19 slots)
    const TOTAL_SLOTS_PER_DAY = 19;
    
    // Return only dates where ALL slots are booked
    const fullyBookedDates: Date[] = [];
    dateMap.forEach((count, dateKey) => {
      if (count >= TOTAL_SLOTS_PER_DAY) {
        const date = dateObjects.get(dateKey);
        if (date) {
          fullyBookedDates.push(date);
        }
      }
    });
    
    return fullyBookedDates;
  }

  // Get booked times for a specific date
  getBookedTimes(date: Date): string[] {
    const bookings = this.getBookings();
    const dateString = date.toDateString();
    
    return bookings
      .filter(booking => booking.date.toDateString() === dateString)
      .map(booking => booking.time);
  }

  // Check if a specific date/time is booked
  isSlotBooked(date: Date, time: string): boolean {
    const bookings = this.getBookings();
    const dateString = date.toDateString();
    
    return bookings.some(
      booking => 
        booking.date.toDateString() === dateString && 
        booking.time === time
    );
  }

  // Add a new booking
  addBooking(date: Date, time: string, email: string, name: string): boolean {
    try {
      // Check if slot is already booked
      if (this.isSlotBooked(date, time)) {
        return false;
      }

      const bookings = this.getBookings();
      bookings.push({
        date,
        time,
        email,
        name
      });
      
      this.saveBookings(bookings);
      return true;
    } catch (error) {
      console.error('Error adding booking:', error);
      return false;
    }
  }

  // Remove a booking (for admin/cancellation)
  removeBooking(date: Date, time: string): boolean {
    try {
      const bookings = this.getBookings();
      const dateString = date.toDateString();
      
      const filtered = bookings.filter(
        booking => 
          !(booking.date.toDateString() === dateString && booking.time === time)
      );
      
      this.saveBookings(filtered);
      return true;
    } catch (error) {
      console.error('Error removing booking:', error);
      return false;
    }
  }

  // Get all bookings for a specific date
  getBookingsForDate(date: Date): Booking[] {
    const bookings = this.getBookings();
    const dateString = date.toDateString();
    
    return bookings.filter(
      booking => booking.date.toDateString() === dateString
    );
  }

  // Clear all bookings (for testing)
  clearAllBookings(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const bookingService = new BookingService();

