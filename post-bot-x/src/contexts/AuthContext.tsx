import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { auth, firestore } from "../firebase";
import generateUniqueId from "./GenerateUniqueId";
import { User } from "../types";

interface AuthContextType {
  currentUser: any;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  passwordlessLogin: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  getUserByEmailAsync: (email: string) => Promise<User | null>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      // Update display name
      await updateProfile(user, { displayName: name });
      const existingAnonymousUserId = localStorage.getItem("anonymousUserId");
      if (existingAnonymousUserId) {
        localStorage.removeItem("anonymousUserId");
      }
      const id = existingAnonymousUserId
        ? existingAnonymousUserId
        : generateUniqueId();
      const newUser: User = {
        id,
        name,
        email,
        createdOn: new Date(),
      };
      await addDoc(collection(firestore, "User"), newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const passwordlessLogin = async (email: string) => {
    await sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:5173/login",
      handleCodeInApp: true,
    });
    window.localStorage.setItem("emailForSignIn", email);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  async function getUserByEmailAsync(email: string): Promise<User | null> {
    try {
      const userQuery = query(
        collection(firestore, "User"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as User; // Type assertion to User
        return userData;
      } else {
        return null;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    signUp,
    signIn,
    passwordlessLogin,
    logOut,
    getUserByEmailAsync,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
