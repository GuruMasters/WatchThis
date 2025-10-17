import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../shared/firebase-config/src/index';

// Check if Firebase services are available
const isFirebaseAvailable = auth && db;

if (!isFirebaseAvailable) {
  console.warn('🔶 Firebase services are not available. Authentication features will not work.');
  console.warn('Please update your .env file with actual Firebase project values to enable Firebase services.');
  console.warn('Get your Firebase config from: https://console.firebase.google.com/');
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  role: 'client' | 'consultant' | 'admin';
  avatar?: string;
  bio?: string;
  specialties?: string[];
  hourlyRate?: number;
  availability?: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
    };
    workingDays: number[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    profile: null,
    loading: true,
    error: null
  };
  private listeners: ((state: AuthState) => void)[] = [];

  private constructor() {
    this.initializeAuthListener();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  private async initializeAuthListener() {
    if (!isFirebaseAvailable) {
      console.warn('Firebase Auth is not available. Authentication features will not work.');
      this.authState.loading = false;
      this.notifyListeners();
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.loadUserProfile(user.uid);
      } else {
        this.authState = {
          user: null,
          profile: null,
          loading: false,
          error: null
        };
        this.notifyListeners();
      }
    });
  }

  private async loadUserProfile(uid: string) {
    try {
      this.authState.loading = true;
      this.notifyListeners();

      if (!isFirebaseAvailable) {
        console.warn('Firebase services are not available. Cannot load user profile.');
        this.authState.loading = false;
        this.notifyListeners();
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', uid));

      if (userDoc.exists()) {
        const profileData = userDoc.data();
        this.authState.profile = {
          ...profileData,
          createdAt: profileData.createdAt.toDate(),
          updatedAt: profileData.updatedAt.toDate()
        } as UserProfile;
      } else {
        // Create profile if it doesn't exist
        await this.createUserProfile(uid, auth.currentUser!);
      }

      this.authState.loading = false;
      this.notifyListeners();
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.authState.error = 'Failed to load user profile';
      this.authState.loading = false;
      this.notifyListeners();
    }
  }

  private async createUserProfile(uid: string, user: User) {
    const [firstName = '', lastName = ''] = user.displayName?.split(' ') || ['', ''];

    const profile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
      uid,
      email: user.email!,
      displayName: user.displayName || `${firstName} ${lastName}`,
      firstName,
      lastName,
      company: '',
      phone: '',
      role: 'client',
      avatar: user.photoURL || undefined
    };

    await setDoc(doc(db, 'users', uid), {
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.authState.profile = {
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    if (!isFirebaseAvailable) {
      this.authState.error = 'Firebase services are not available. Please check your configuration.';
      this.authState.loading = false;
      this.notifyListeners();
      throw new Error('Firebase services are not available');
    }

    try {
      this.authState.loading = true;
      this.authState.error = null;
      this.notifyListeners();

      await signInWithEmailAndPassword(auth, email, password);

      // Profile will be loaded by the auth state listener
    } catch (error) {
      const authError = error as AuthError;
      this.authState.error = this.getErrorMessage(authError.code);
      this.authState.loading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async signUpWithEmail(
    email: string,
    password: string,
    profileData: Partial<UserProfile>
  ): Promise<void> {
    if (!isFirebaseAvailable) {
      this.authState.error = 'Firebase services are not available. Please check your configuration.';
      this.authState.loading = false;
      this.notifyListeners();
      throw new Error('Firebase services are not available');
    }

    try {
      this.authState.loading = true;
      this.authState.error = null;
      this.notifyListeners();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name if provided
      if (profileData.displayName) {
        await updateProfile(user, {
          displayName: profileData.displayName
        });
      }

      // Create user profile
      const profile: Omit<UserProfile, 'uid' | 'email' | 'createdAt' | 'updatedAt'> = {
        displayName: profileData.displayName || '',
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        company: profileData.company || '',
        phone: profileData.phone || '',
        role: profileData.role || 'client',
        bio: profileData.bio || '',
        specialties: profileData.specialties || [],
        hourlyRate: profileData.hourlyRate || 0,
        availability: profileData.availability
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Profile will be loaded by the auth state listener
    } catch (error) {
      const authError = error as AuthError;
      this.authState.error = this.getErrorMessage(authError.code);
      this.authState.loading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      this.authState.loading = true;
      this.authState.error = null;
      this.notifyListeners();

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      await signInWithPopup(auth, provider);

      // Profile will be loaded by the auth state listener
    } catch (error) {
      const authError = error as AuthError;
      this.authState.error = this.getErrorMessage(authError.code);
      this.authState.loading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async signInWithLinkedIn(): Promise<void> {
    try {
      this.authState.loading = true;
      this.authState.error = null;
      this.notifyListeners();

      // LinkedIn OAuth would be implemented here
      // For now, we'll simulate it
      console.log('LinkedIn sign-in would be implemented here');

      // Simulate successful LinkedIn sign-in
      const mockUser = {
        uid: 'linkedin_' + Date.now(),
        email: 'linkedin.user@company.com',
        displayName: 'LinkedIn User'
      };

      // In a real implementation, you would use LinkedIn OAuth provider
      // await signInWithPopup(auth, linkedinProvider);

      this.authState.loading = false;
      this.notifyListeners();

      throw new Error('LinkedIn integration not yet implemented');
    } catch (error) {
      const authError = error as AuthError;
      this.authState.error = this.getErrorMessage(authError.code);
      this.authState.loading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(this.getErrorMessage(authError.code));
    }
  }

  async signOutUser(): Promise<void> {
    try {
      await signOut(auth);
      this.authState = {
        user: null,
        profile: null,
        loading: false,
        error: null
      };
      this.notifyListeners();
    } catch (error) {
      throw new Error('Failed to sign out');
    }
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!this.authState.user || !this.authState.profile) {
      throw new Error('No user logged in');
    }

    try {
      // Update Firebase Auth profile
      if (updates.displayName) {
        await updateProfile(this.authState.user, {
          displayName: updates.displayName
        });
      }

      // Update Firestore profile
      const profileRef = doc(db, 'users', this.authState.user.uid);
      await updateDoc(profileRef, {
        ...updates,
        updatedAt: new Date()
      });

      // Update local state
      this.authState.profile = {
        ...this.authState.profile,
        ...updates,
        updatedAt: new Date()
      };

      this.notifyListeners();
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  getCurrentState(): AuthState {
    return this.authState;
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Please enter a valid email address';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export const authService = AuthService.getInstance();
