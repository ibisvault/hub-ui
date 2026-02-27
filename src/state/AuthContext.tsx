import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { rhub } from "@/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = useCallback(async (userId: string, pin: string): Promise<boolean> => {
    setError(null);
    setLoading(true);

    try {
      const res = await rhub.authenticate({ user_id: userId, pin });
      if (res.token) {
        sessionStorage.setItem("auth_token", res.token);
        setIsAuthenticated(true);
        setLoading(false);
        return true;
      }
      setError("Login failed — no token returned");
      setLoading(false);
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    sessionStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
