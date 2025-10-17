import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@consultation-booking/consultation/frontend/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@consultation-booking/consultation/frontend/components/ui/card';
import { Input } from '@consultation-booking/consultation/frontend/components/ui/input';
import { Textarea } from '@consultation-booking/consultation/frontend/components/ui/textarea';
import { Label } from '@consultation-booking/consultation/frontend/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@consultation-booking/consultation/frontend/components/ui/select';
import { Calendar } from '@consultation-booking/consultation/frontend/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@consultation-booking/consultation/frontend/components/ui/popover';
import { cn } from '@consultation-booking/consultation/frontend/utils/cn';
import { Employee, Service, BookingFormData } from '@consultation-booking/consultation/frontend/types';
import { serviceService } from '@consultation-booking/consultation/frontend/services/firebase';

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  clientEmail: z.string().email('Please enter a valid email address'),
  clientPhone: z.string().optional(),
  employeeId: z.string().min(1, 'Please select an employee'),
  serviceType: z.string().min(1, 'Please select a service type'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z.string().min(1, 'Please select a time'),
  notes: z.string().optional(),
});

interface BookingFormProps {
  employee?: Employee;
  onSubmit: (data: BookingFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  employee,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      employeeId: employee?.id || '',
      serviceType: '',
    },
  });

  const watchedDate = watch('date');
  const watchedTime = watch('time');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await serviceService.getAll();
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading services:', error);
      }
    };

    loadServices();
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue('date', date.toISOString());
    }
  };

  const handleSubmitForm = async (data: BookingFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Book a Consultation
        </CardTitle>
        <CardDescription>
          {employee
            ? `Schedule a consultation with ${employee.name}`
            : 'Select an employee and schedule your consultation'
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="clientName"
                {...register('clientName')}
                placeholder="Enter your full name"
                className={cn(errors.clientName && 'border-destructive')}
              />
              {errors.clientName && (
                <p className="text-sm text-destructive">{errors.clientName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail" className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="clientEmail"
                type="email"
                {...register('clientEmail')}
                placeholder="Enter your email"
                className={cn(errors.clientEmail && 'border-destructive')}
              />
              {errors.clientEmail && (
                <p className="text-sm text-destructive">{errors.clientEmail.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientPhone" className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="clientPhone"
                {...register('clientPhone')}
                placeholder="Enter your phone number"
                className={cn(errors.clientPhone && 'border-destructive')}
              />
              {errors.clientPhone && (
                <p className="text-sm text-destructive">{errors.clientPhone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select onValueChange={(value) => setValue('serviceType', value)}>
                <SelectTrigger className={cn(errors.serviceType && 'border-destructive')}>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name} ({service.duration}min - ${service.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-sm text-destructive">{errors.serviceType.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !watchedDate && 'text-muted-foreground',
                      errors.date && 'border-destructive'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {watchedDate ? (
                      format(new Date(watchedDate), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-sm text-destructive">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Time *
              </Label>
              <Select onValueChange={(value) => setValue('time', value)}>
                <SelectTrigger className={cn(errors.time && 'border-destructive')}>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-sm text-destructive">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              Notes
            </Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Any specific requirements or questions..."
              rows={3}
              className={cn(errors.notes && 'border-destructive')}
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="neutral" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Book Consultation'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
