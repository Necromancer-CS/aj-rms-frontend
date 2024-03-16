import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "src/hooks/use-localstorage";
import { User } from "src/types/user";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
};

export interface AuthContextType extends State {
  signIn: (data: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const signIn = async (data: User) => {
    setUser(data);
    setIsAuthenticated(true);
    navigate("/admin/desk");
  };

  // call this function to sign out logged in user
  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      signIn,
      signOut,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
