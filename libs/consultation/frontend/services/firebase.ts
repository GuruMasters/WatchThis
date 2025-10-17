import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../../../shared/firebase-config/src/index';
import { Employee, Booking, Review, Service, ApiResponse, PaginatedResponse } from '../types';

// Collection references
const employeesCollection = collection(db, 'employees');
const bookingsCollection = collection(db, 'bookings');
const reviewsCollection = collection(db, 'reviews');
const servicesCollection = collection(db, 'services');

// Employee services
export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const q = query(employeesCollection, where('isActive', '==', true), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Employee));
  },

  async getById(id: string): Promise<Employee | null> {
    const docRef = doc(employeesCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Employee;
    }
    return null;
  },

  async getBySpecialty(specialty: string): Promise<Employee[]> {
    const q = query(
      employeesCollection,
      where('isActive', '==', true),
      where('specialties', 'array-contains', specialty),
      orderBy('rating', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Employee));
  }
};

// Booking services
export const bookingService = {
  async create(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(bookingsCollection, {
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  },

  async getById(id: string): Promise<Booking | null> {
    const docRef = doc(bookingsCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Booking;
    }
    return null;
  },

  async getByEmployeeId(employeeId: string): Promise<Booking[]> {
    const q = query(
      bookingsCollection,
      where('employeeId', '==', employeeId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
  },

  async getByClientId(clientId: string): Promise<Booking[]> {
    const q = query(
      bookingsCollection,
      where('clientId', '==', clientId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
  },

  async updateStatus(id: string, status: Booking['status']): Promise<void> {
    const docRef = doc(bookingsCollection, id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date(),
    });
  }
};

// Service services
export const serviceService = {
  async getAll(): Promise<Service[]> {
    const q = query(servicesCollection, where('isActive', '==', true), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Service));
  },

  async getById(id: string): Promise<Service | null> {
    const docRef = doc(servicesCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Service;
    }
    return null;
  }
};

// Review services
export const reviewService = {
  async getByEmployeeId(employeeId: string): Promise<Review[]> {
    const q = query(
      reviewsCollection,
      where('employeeId', '==', employeeId),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  },

  async create(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(reviewsCollection, {
      ...reviewData,
      createdAt: new Date(),
    });
    return docRef.id;
  }
};

// Email service using EmailJS
export const emailService = {
  async sendBookingConfirmation(booking: Booking): Promise<void> {
    // This will be implemented with EmailJS
    console.log('Sending booking confirmation email:', booking);
  },

  async sendBookingNotification(booking: Booking): Promise<void> {
    // This will be implemented with EmailJS
    console.log('Sending booking notification to employee:', booking);
  }
};
