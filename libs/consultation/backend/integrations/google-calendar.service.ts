import { Injectable } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { JWT } from 'google-auth-library';

// Types
interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: 'accepted' | 'declined' | 'tentative' | 'needsAction';
  }>;
  reminders?: {
    useDefault: boolean;
    overrides?: Array<{
      method: 'email' | 'popup';
      minutes: number;
    }>;
  };
  conferenceData?: {
    createRequest?: {
      requestId: string;
      conferenceSolutionKey: {
        type: 'hangoutsMeet';
      };
    };
  };
  colorId?: string;
}

// Using the CalendarEvent interface defined above

@Injectable()
export class GoogleCalendarService {
  private calendar: calendar_v3.Calendar;

  constructor() {
    this.initializeGoogleCalendar();
  }

  private initializeGoogleCalendar() {
    try {
      // Initialize with service account for server-side operations
      const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

      if (serviceAccountKey) {
        const credentials = JSON.parse(serviceAccountKey);
        const jwtClient = new JWT({
          email: credentials.client_email,
          key: credentials.private_key,
          scopes: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
          ],
        });

        this.calendar = google.calendar({ version: 'v3', auth: jwtClient });
      } else {
        console.warn('Google Service Account key not found. Calendar integration disabled.');
      }
    } catch (error) {
      console.error('Error initializing Google Calendar:', error);
    }
  }

  async createEvent(event: CalendarEvent, calendarId: string = 'primary'): Promise<string> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      // Add conference data for video meetings
      if (!event.conferenceData?.createRequest) {
        event.conferenceData = {
          createRequest: {
            requestId: `consultation-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        };
      }

      const response = await this.calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        sendUpdates: 'all',
        requestBody: event,
      });

      return response.data.id || '';
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async updateEvent(
    eventId: string,
    event: Partial<CalendarEvent>,
    calendarId: string = 'primary'
  ): Promise<void> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      await this.calendar.events.update({
        calendarId,
        eventId,
        sendUpdates: 'all',
        requestBody: event,
      });
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw new Error('Failed to update calendar event');
    }
  }

  async deleteEvent(eventId: string, calendarId: string = 'primary'): Promise<void> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      await this.calendar.events.delete({
        calendarId,
        eventId,
        sendUpdates: 'all',
      });
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw new Error('Failed to delete calendar event');
    }
  }

  async getEvent(eventId: string, calendarId: string = 'primary'): Promise<calendar_v3.Schema$Event> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      const response = await this.calendar.events.get({
        calendarId,
        eventId,
      });

      return response.data;
    } catch (error) {
      console.error('Error getting calendar event:', error);
      throw new Error('Failed to get calendar event');
    }
  }

  async listEvents(
    timeMin: Date,
    timeMax: Date,
    calendarId: string = 'primary'
  ): Promise<calendar_v3.Schema$Event[]> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      const response = await this.calendar.events.list({
        calendarId,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error listing calendar events:', error);
      throw new Error('Failed to list calendar events');
    }
  }

  async checkAvailability(
    consultantEmail: string,
    startTime: Date,
    endTime: Date,
    calendarId: string = 'primary'
  ): Promise<boolean> {
    try {
      const events = await this.listEvents(startTime, endTime, calendarId);

      // Check if there are any conflicting events
      const hasConflict = events.some(event => {
        if (!event.start?.dateTime || !event.end?.dateTime) {
          return false;
        }

        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);

        // Check for overlap
        return (startTime < eventEnd && endTime > eventStart);
      });

      return !hasConflict;
    } catch (error) {
      console.error('Error checking availability:', error);
      // Return false (assume busy) if we can't check availability
      return false;
    }
  }

  async getFreeBusy(
    consultantEmails: string[],
    timeMin: Date,
    timeMax: Date
  ): Promise<any> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      const response = await this.calendar.freebusy.query({
        requestBody: {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          items: consultantEmails.map(email => ({ id: email })),
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error getting free/busy information:', error);
      throw new Error('Failed to get free/busy information');
    }
  }

  async createConsultationEvent(
    clientEmail: string,
    consultantEmail: string,
    consultationDetails: {
      title: string;
      description: string;
      startTime: Date;
      endTime: Date;
      location?: string;
    }
  ): Promise<string> {
    try {
      const event: CalendarEvent = {
        summary: consultationDetails.title,
        description: consultationDetails.description,
        start: {
          dateTime: consultationDetails.startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: consultationDetails.endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: [
          {
            email: clientEmail,
            displayName: 'Client',
            responseStatus: 'accepted',
          },
          {
            email: consultantEmail,
            displayName: 'Consultant',
            responseStatus: 'accepted',
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: 'email',
              minutes: 60, // 1 hour before
            },
            {
              method: 'email',
              minutes: 15, // 15 minutes before
            },
            {
              method: 'popup',
              minutes: 15, // Popup 15 minutes before
            },
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: `consultation-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      };

      return await this.createEvent(event);
    } catch (error) {
      console.error('Error creating consultation event:', error);
      throw new Error('Failed to create consultation calendar event');
    }
  }

  async syncBookingToCalendar(
    bookingId: string,
    clientEmail: string,
    consultantEmail: string,
    scheduledAt: Date,
    duration: number,
    meetingType: 'video' | 'phone' | 'chat' | 'in_person',
    notes?: string
  ): Promise<string> {
    try {
      const endTime = new Date(scheduledAt);
      endTime.setMinutes(endTime.getMinutes() + duration);

      const title = `Consultation Session - Booking #${bookingId}`;
      const description = `
Consultation Details:
- Booking ID: ${bookingId}
- Meeting Type: ${meetingType}
- Duration: ${duration} minutes
${notes ? `- Notes: ${notes}` : ''}

Please join the meeting at the scheduled time.
      `.trim();

      return await this.createConsultationEvent(
        clientEmail,
        consultantEmail,
        {
          title,
          description,
          startTime: scheduledAt,
          endTime,
        }
      );
    } catch (error) {
      console.error('Error syncing booking to calendar:', error);
      throw new Error('Failed to sync booking to calendar');
    }
  }

  async updateBookingInCalendar(
    eventId: string,
    scheduledAt: Date,
    duration: number,
    meetingType: string,
    notes?: string
  ): Promise<void> {
    try {
      const endTime = new Date(scheduledAt);
      endTime.setMinutes(endTime.getMinutes() + duration);

      const description = `
Consultation Details:
- Meeting Type: ${meetingType}
- Duration: ${duration} minutes
${notes ? `- Notes: ${notes}` : ''}

Updated: ${new Date().toISOString()}
      `.trim();

      await this.updateEvent(eventId, {
        start: {
          dateTime: scheduledAt.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        description,
      });
    } catch (error) {
      console.error('Error updating booking in calendar:', error);
      throw new Error('Failed to update booking in calendar');
    }
  }

  async cancelBookingInCalendar(eventId: string, reason?: string): Promise<void> {
    try {
      const event = await this.getEvent(eventId);

      const updatedDescription = `
${event.description || ''}

--- CANCELLED ---
Reason: ${reason || 'Not specified'}
Cancelled: ${new Date().toISOString()}
      `.trim();

      await this.updateEvent(eventId, {
        summary: `(CANCELLED) ${event.summary}`,
        description: updatedDescription,
        colorId: '11', // Red color for cancelled events
      });
    } catch (error) {
      console.error('Error cancelling booking in calendar:', error);
      throw new Error('Failed to cancel booking in calendar');
    }
  }

  async getCalendarList(): Promise<calendar_v3.Schema$CalendarListEntry[]> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      const response = await this.calendar.calendarList.list();
      return response.data.items || [];
    } catch (error) {
      console.error('Error getting calendar list:', error);
      throw new Error('Failed to get calendar list');
    }
  }

  async createSecondaryCalendar(name: string, description?: string): Promise<string> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized');
      }

      const response = await this.calendar.calendars.insert({
        requestBody: {
          summary: name,
          description,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      });

      return response.data.id || '';
    } catch (error) {
      console.error('Error creating secondary calendar:', error);
      throw new Error('Failed to create secondary calendar');
    }
  }
}
