import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/config';
import userService from '../services/userService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null); // MongoDB user data with role
  const [loading, setLoading] = useState(true);

  // Create user profile in database and return the profile
  const createUserProfile = async (firebaseUser) => {
    try {
      const profileData = await userService.getOrCreateProfile({
        userId: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        photoURL: firebaseUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseUser.email)}&background=22c55e&color=fff`
      });
      console.log('✅ User profile created/updated');
      return profileData;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  };

  // Fetch user profile from database
  const fetchUserProfile = async (userId) => {
    try {
      const response = await userService.getUserProfile(userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Register with email/password
  const register = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const profile = await createUserProfile(result.user);
    setUser(profile);
    return result;
  };

  // Login with email/password
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const profile = await fetchUserProfile(result.user.uid);
    setUser(profile);
    return result;
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const profile = await createUserProfile(result.user);
    setUser(profile);
    return result;
  };

  // Logout
  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  // Get current user token
  const getToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await createUserProfile(firebaseUser);
        // Fetch the full user profile from database
        const profile = await fetchUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setCurrentUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser, // Firebase user
    user, // MongoDB user data with role
    register,
    login,
    loginWithGoogle,
    logout,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};