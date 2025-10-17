// Core application types

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  isActive: boolean;
  hourlyRate?: number;
  experience?: number;
  certifications?: string[];
  languages?: string[];
  availability: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    workingDays: string[];
  };
}

export interface Booking {
  id: string;
  clientId: string;
  employeeId: string;
  serviceId: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  price: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  isActive: boolean;
  imageUrl?: string;
  features?: string[];
  requirements?: string[];
}

export interface Review {
  id: string;
  employeeId: string;
  clientId: string;
  bookingId: string;
  rating: number;
  comment?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}