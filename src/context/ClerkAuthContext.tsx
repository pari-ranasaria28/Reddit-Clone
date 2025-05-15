
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { User } from "../types";
import { toast } from "sonner";

interface ClerkAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

export const ClerkAuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && clerkUser) {
        // Map Clerk user to our app's user model
        const appUser: User = {
          id: clerkUser.id,
          username: clerkUser.username || clerkUser.firstName || "user",
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          avatar: clerkUser.imageUrl,
          createdAt: new Date(clerkUser.createdAt),
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [clerkUser, isLoaded, isSignedIn]);

  return (
    <ClerkAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </ClerkAuthContext.Provider>
  );
};

export const useClerkAuth = () => {
  const context = useContext(ClerkAuthContext);
  if (context === undefined) {
    throw new Error("useClerkAuth must be used within a ClerkAuthProvider");
  }
  return context;
};
