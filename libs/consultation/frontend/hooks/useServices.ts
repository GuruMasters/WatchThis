import { useQuery } from '@tanstack/react-query';
import { serviceService } from '@consultation-booking/consultation/frontend/services/firebase';
import { Service } from '@consultation-booking/consultation/frontend/types';

// Query keys
export const SERVICE_KEYS = {
  all: ['services'] as const,
  lists: () => [...SERVICE_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...SERVICE_KEYS.lists(), filters] as const,
  details: () => [...SERVICE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...SERVICE_KEYS.details(), id] as const,
};

// Get all services
export const useServices = () => {
  return useQuery({
    queryKey: SERVICE_KEYS.lists(),
    queryFn: () => serviceService.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes - services don't change often
  });
};

// Get service by ID
export const useService = (id: string) => {
  return useQuery({
    queryKey: SERVICE_KEYS.detail(id),
    queryFn: () => serviceService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
