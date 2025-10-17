import React from 'react';
import { authService, AuthState, UserProfile } from '../services/auth';

interface UseAuthReturn extends AuthState {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = React.useState<AuthState>(authService.getCurrentState());

  React.useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    ...authState,
    signInWithEmail: authService.signInWithEmail.bind(authService),
    signUpWithEmail: authService.signUpWithEmail.bind(authService),
    signInWithGoogle: authService.signInWithGoogle.bind(authService),
    signInWithLinkedIn: authService.signInWithLinkedIn.bind(authService),
    sendPasswordResetEmail: authService.sendPasswordResetEmail.bind(authService),
    signOut: authService.signOutUser.bind(authService),
    updateProfile: authService.updateProfile.bind(authService),
  };
};

export default useAuth;