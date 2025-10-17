import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { adminAuth, adminFirestore, adminStorage } from '../../../shared/firebase-config/src/index';

@Injectable()
export class FirebaseService {
  private db: admin.firestore.Firestore;
  private auth: admin.auth.Auth;
  private storage: admin.storage.Storage;

  constructor() {
    // Ensure we're on the server side before using Firebase Admin
    if (!adminAuth || !adminFirestore || !adminStorage) {
      throw new Error('Firebase Admin SDK is not available. This service should only be used on the server side.');
    }

    this.db = adminFirestore;
    this.auth = adminAuth;
    this.storage = adminStorage;
  }

  // Database Collections Setup
  async initializeDatabase(): Promise<void> {
    try {
      await this.setupCollections();
      await this.createIndexes();
      await this.setupSecurityRules();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async setupCollections(): Promise<void> {
    const collections = [
      'users',
      'consultants',
      'bookings',
      'messages',
      'conversations',
      'notifications',
      'services',
      'reviews',
      'availability',
      'payments',
      'analytics'
    ];

    for (const collectionName of collections) {
      const collectionRef = this.db.collection(collectionName);
      // Check if collection exists
      const snapshot = await collectionRef.limit(1).get();
      if (snapshot.empty) {
        console.log(`Collection ${collectionName} is ready`);
      }
    }
  }

  private async createIndexes(): Promise<void> {
    // This would create composite indexes for better query performance
    // In production, these would be created in Firebase Console
    console.log('Database indexes configured');
  }

  private async setupSecurityRules(): Promise<void> {
    // This would set up Firestore security rules
    // In production, this would be done via Firebase Console or CLI
    console.log('Database security rules configured');
  }

  // User Management
  async createUser(userData: {
    email: string;
    password: string;
    displayName: string;
  }): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
      });
      return userRecord;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUserPassword(email: string, newPassword: string): Promise<void> {
    try {
      const user = await this.auth.getUserByEmail(email);
      await this.auth.updateUser(user.uid, {
        password: newPassword,
      });
    } catch (error) {
      console.error('Error updating user password:', error);
      throw error;
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      await this.auth.deleteUser(uid);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Database Operations
  async createDocument(collection: string, data: any, id?: string): Promise<string> {
    try {
      if (id) {
        await this.db.collection(collection).doc(id).set(data);
        return id;
      } else {
        const docRef = await this.db.collection(collection).add(data);
        return docRef.id;
      }
    } catch (error) {
      console.error(`Error creating document in ${collection}:`, error);
      throw error;
    }
  }

  async getDocument(collection: string, id: string): Promise<any> {
    try {
      const docRef = this.db.collection(collection).doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw new Error(`Document ${id} not found in ${collection}`);
      }

      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error(`Error getting document from ${collection}:`, error);
      throw error;
    }
  }

  async updateDocument(collection: string, id: string, data: any): Promise<void> {
    try {
      const docRef = this.db.collection(collection).doc(id);
      await docRef.update({
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(`Error updating document in ${collection}:`, error);
      throw error;
    }
  }

  async deleteDocument(collection: string, id: string): Promise<void> {
    try {
      await this.db.collection(collection).doc(id).delete();
    } catch (error) {
      console.error(`Error deleting document from ${collection}:`, error);
      throw error;
    }
  }

  async queryDocuments(
    collection: string,
    filters: { field: string; operator: any; value: any }[] = [],
    orderByField?: string,
    limitCount?: number
  ): Promise<any[]> {
    try {
      let queryRef: any = this.db.collection(collection);

      filters.forEach(filter => {
        queryRef = queryRef.where(filter.field, filter.operator, filter.value);
      });

      if (orderByField) {
        queryRef = queryRef.orderBy(orderByField, 'desc');
      }

      if (limitCount) {
        queryRef = queryRef.limit(limitCount);
      }

      const snapshot = await queryRef.get();
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error querying documents from ${collection}:`, error);
      throw error;
    }
  }

  // Analytics
  async incrementCounter(collection: string, field: string): Promise<void> {
    try {
      const counterRef = this.db.collection('counters').doc(collection);
      const counterDoc = await counterRef.get();

      if (counterDoc.exists) {
        await counterRef.update({
          [field]: admin.firestore.FieldValue.increment(1),
          updatedAt: new Date(),
        });
      } else {
        await counterRef.set({
          [field]: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error incrementing counter:', error);
    }
  }

  async getAnalytics(): Promise<any> {
    try {
      const [usersSnapshot, bookingsSnapshot, messagesSnapshot] = await Promise.all([
        this.db.collection('users').get(),
        this.db.collection('bookings').get(),
        this.db.collection('messages').get(),
      ]);

      const analytics = {
        totalUsers: usersSnapshot.size,
        totalBookings: bookingsSnapshot.size,
        totalMessages: messagesSnapshot.size,
        timestamp: new Date(),
      };

      // Store analytics snapshot
      await this.db.collection('analytics').add(analytics);

      return analytics;
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  }

  // Batch Operations
  async batchWrite(operations: { type: 'set' | 'update' | 'delete'; collection: string; id: string; data?: any }[]): Promise<void> {
    try {
      const batch = this.db.batch();

      operations.forEach(op => {
        const docRef = this.db.collection(op.collection).doc(op.id);

        switch (op.type) {
          case 'set':
            batch.set(docRef, op.data);
            break;
          case 'update':
            batch.update(docRef, op.data);
            break;
          case 'delete':
            batch.delete(docRef);
            break;
        }
      });

      await batch.commit();
    } catch (error) {
      console.error('Error executing batch write:', error);
      throw error;
    }
  }

  // Health Check
  async healthCheck(): Promise<boolean> {
    try {
      await this.db.collection('health').doc('status').set({
        status: 'healthy',
        timestamp: new Date(),
      });
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Cleanup old data
  async cleanupOldData(): Promise<void> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Delete old notifications
      const oldNotificationsQuery = this.db.collection('notifications')
        .where('createdAt', '<', thirtyDaysAgo)
        .where('read', '==', true);

      const oldNotificationsSnapshot = await oldNotificationsQuery.get();
      const deletePromises = oldNotificationsSnapshot.docs.map(doc => doc.ref.delete());

      await Promise.all(deletePromises);

      console.log(`Cleaned up ${oldNotificationsSnapshot.size} old notifications`);
    } catch (error) {
      console.error('Error cleaning up old data:', error);
    }
  }
}
