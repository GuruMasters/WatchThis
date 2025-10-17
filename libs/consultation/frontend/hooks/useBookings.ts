import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@consultation-booking/consultation/frontend/services/firebase';
import { Booking } from '@consultation-booking/consultation/frontend/types';

// Query keys
export const BOOKING_KEYS = {
  all: ['bookings'] as const,
  lists: () => [...BOOKING_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...BOOKING_KEYS.lists(), filters] as const,
  details: () => [...BOOKING_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BOOKING_KEYS.details(), id] as const,
  byEmployee: (employeeId: string) => [...BOOKING_KEYS.all, 'employee', employeeId] as const,
  byClient: (clientId: string) => [...BOOKING_KEYS.all, 'client', clientId] as const,
};

// Get booking by ID
export const useBooking = (id: string) => {
  return useQuery({
    queryKey: BOOKING_KEYS.detail(id),
    queryFn: () => bookingService.getById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get bookings by employee ID
export const useBookingsByEmployee = (employeeId: string) => {
  return useQuery({
    queryKey: BOOKING_KEYS.byEmployee(employeeId),
    queryFn: () => bookingService.getByEmployeeId(employeeId),
    enabled: !!employeeId,
    staleTime: 2 * 60 * 1000,
  });
};

// Get bookings by client ID
export const useBookingsByClient = (clientId: string) => {
  return useQuery({
    queryKey: BOOKING_KEYS.byClient(clientId),
    queryFn: () => bookingService.getByClientId(clientId),
    enabled: !!clientId,
    staleTime: 2 * 60 * 1000,
  });
};

// Mutations
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) =>
      bookingService.create(bookingData),
    onSuccess: (bookingId) => {
      // Invalidate all booking queries
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.all });
      // Return the booking ID for further use
      return bookingId;
    },
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Booking['status'] }) =>
      bookingService.updateStatus(id, status),
    onSuccess: () => {
      // Invalidate all booking queries
      queryClient.invalidateQueries({ queryKey: BOOKING_KEYS.all });
    },
  });
};
