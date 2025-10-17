import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '@consultation-booking/consultation/frontend/services/firebase';
import { Employee } from '@consultation-booking/consultation/frontend/types';

// Query keys
export const EMPLOYEE_KEYS = {
  all: ['employees'] as const,
  lists: () => [...EMPLOYEE_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...EMPLOYEE_KEYS.lists(), filters] as const,
  details: () => [...EMPLOYEE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...EMPLOYEE_KEYS.details(), id] as const,
  specialties: (specialty: string) => [...EMPLOYEE_KEYS.all, 'specialty', specialty] as const,
};

// Get all employees
export const useEmployees = () => {
  return useQuery({
    queryKey: EMPLOYEE_KEYS.lists(),
    queryFn: () => employeeService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get employee by ID
export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: EMPLOYEE_KEYS.detail(id),
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Get employees by specialty
export const useEmployeesBySpecialty = (specialty: string) => {
  return useQuery({
    queryKey: EMPLOYEE_KEYS.specialties(specialty),
    queryFn: () => employeeService.getBySpecialty(specialty),
    enabled: !!specialty,
    staleTime: 5 * 60 * 1000,
  });
};

// Prefetch employees
export const usePrefetchEmployees = () => {
  const queryClient = useQueryClient();

  const prefetchEmployees = () => {
    queryClient.prefetchQuery({
      queryKey: EMPLOYEE_KEYS.lists(),
      queryFn: () => employeeService.getAll(),
      staleTime: 5 * 60 * 1000,
    });
  };

  return prefetchEmployees;
};
