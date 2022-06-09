import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { updateAxios } from "../axios/axios";

interface UserProps {
  token: string | null;
  isLoading: boolean;
  setToken: Dispatch<SetStateAction<string | null>>;
  checkAuth: () => void;
  autoLogout: (token: string, expiresAt: number) => void;
}

const AuthContext = createContext<UserProps>({} as UserProps);

export const AuthProvider: FunctionComponent<any> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  updateAxios(token);

  const autoLogout = (token: string, expiresAt: number) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expires_at", String(expiresAt));
    setToken(token);
    setTimeout(() => {
      localStorage.clear();
      setToken(null);
    }, expiresAt - Date.now());
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expires_at");
    if (token && expiresAt) {
      setToken(token);
      autoLogout(token, Number(expiresAt));
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isLoading, setToken, checkAuth, autoLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
