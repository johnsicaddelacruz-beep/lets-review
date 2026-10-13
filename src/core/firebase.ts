import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserStats } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Test connection on boot per Firebase guidelines
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network unavailable.');
    }
    return false;
  }
}

export interface UserAccountData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  tier: 'free' | 'pro';
  isPro: boolean;
  paymentReference?: string;
  purchasedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const CloudStorage = {
  // Sign in with Google popup
  async signInWithGoogle(): Promise<FirebaseUser> {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  // Sign out
  async signOut(): Promise<void> {
    await fbSignOut(auth);
  },

  // Fetch or initialize user profile from Firestore
  async getOrCreateProfile(fbUser: FirebaseUser): Promise<UserAccountData> {
    const userDocRef = doc(db, 'users', fbUser.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserAccountData;
        return {
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || 'Reviewee',
          photoURL: fbUser.photoURL || undefined,
          tier: data.tier || 'free',
          isPro: Boolean(data.isPro || data.tier === 'pro'),
          paymentReference: data.paymentReference,
          purchasedAt: data.purchasedAt,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      } else {
        // Create initial Free profile
        const newProfile: UserAccountData = {
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || 'Reviewee',
          photoURL: fbUser.photoURL || undefined,
          tier: 'free',
          isPro: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, newProfile);
        return newProfile;
      }
    } catch (err) {
      console.error('Failed to get/create profile:', err);
      // Fallback
      return {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || 'Reviewee',
        photoURL: fbUser.photoURL || undefined,
        tier: 'free',
        isPro: false,
      };
    }
  },

  // Upgrade user account to Pro
  async upgradeToPro(uid: string, paymentReference: string): Promise<void> {
    const userDocRef = doc(db, 'users', uid);
    const updates = {
      tier: 'pro',
      isPro: true,
      paymentReference,
      purchasedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userDocRef, updates, { merge: true });
  },

  // Fetch user progress & stats from Firestore
  async getUserProgress(uid: string): Promise<UserStats | null> {
    try {
      const statsDocRef = doc(db, 'users', uid, 'progress', 'stats');
      const snap = await getDoc(statsDocRef);
      if (snap.exists()) {
        const data = snap.data();
        return {
          totalAnswered: data.totalAnswered || 0,
          totalCorrect: data.totalCorrect || 0,
          streakRecord: data.streakRecord || 0,
          masteredTerms: Array.isArray(data.masteredTerms) ? data.masteredTerms : [],
          bookmarkedTerms: Array.isArray(data.bookmarkedTerms) ? data.bookmarkedTerms : [],
          modeSessionsCount: data.modeSessionsCount || {},
        };
      }
      return null;
    } catch (err) {
      console.error('Failed to load user progress:', err);
      return null;
    }
  },

  // Save/sync user progress & stats to Firestore
  async saveUserProgress(uid: string, stats: UserStats): Promise<void> {
    try {
      const statsDocRef = doc(db, 'users', uid, 'progress', 'stats');
      await setDoc(statsDocRef, {
        userId: uid,
        totalAnswered: stats.totalAnswered,
        totalCorrect: stats.totalCorrect,
        streakRecord: stats.streakRecord,
        masteredTerms: stats.masteredTerms.slice(0, 500),
        bookmarkedTerms: stats.bookmarkedTerms.slice(0, 500),
        modeSessionsCount: stats.modeSessionsCount,
        lastSyncedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('Failed to sync progress to cloud:', err);
    }
  },
};
