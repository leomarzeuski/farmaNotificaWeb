import { createContext, useContext, useState, ReactNode } from 'react';
import { UserUnityModel } from 'services/userunity/userUnityModel';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserUnityModel>();

  const login = (loadUser: UserUnityModel) => {
    setIsAuthenticated(true);
    setUser(loadUser);
  };
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
