
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types";
import { currentUser as mockCurrentUser, users } from "../utils/mockData";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("redditCloneUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    // In a real app, this would make an API call
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("redditCloneUser", JSON.stringify(foundUser));
        toast.success("You have successfully logged in.");
      } else {
        toast.error("Invalid username or password.");
      }
      
      setLoading(false);
    }, 800);
  };

  const signup = (username: string, email: string, password: string) => {
    // In a real app, this would make an API call
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check if username exists
      const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      
      if (existingUser) {
        toast.error("Username already taken.");
        setLoading(false);
        return;
      }
      
      // Create new user (in a real app, this would be saved to a database)
      const newUser: User = {
        id: (users.length + 1).toString(),
        username,
        email,
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", // Default avatar
        createdAt: new Date(),
      };
      
      setUser(newUser);
      localStorage.setItem("redditCloneUser", JSON.stringify(newUser));
      
      toast.success("Account created successfully.");
      
      setLoading(false);
    }, 800);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("redditCloneUser");
    toast.success("You have successfully logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
