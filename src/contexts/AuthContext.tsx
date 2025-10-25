import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, mockUsers } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (fullName: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (fullName: string, email: string, password: string): boolean => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUser: User = {
      id: mockUsers.length + 1,
      full_name: fullName,
      email,
      password_hash: `hashed_${password}`,
      created_at: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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
