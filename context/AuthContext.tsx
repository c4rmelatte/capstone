import { authService } from "@/services/authService";
import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      console.log("Loading user from AsyncStorage...", user);
      try {
        const storedUser = await AsyncStorage.getItem("user");

        console.log("Stored User:", storedUser);

        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      const mockUser = { id: "1", email };
      await AsyncStorage.setItem("user", JSON.stringify(mockUser));
      setUser(loggedUser);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await authService.signup(username, email, password);
      const mockUser = { id: 1, email };
      await AsyncStorage.setItem("user", JSON.stringify(mockUser));
      setUser(newUser);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
