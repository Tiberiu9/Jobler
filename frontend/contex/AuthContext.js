import {useState, useEffect, createContext} from 'react';
import {useRouter} from 'next/router';
import axios from "axios";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Login user
  const login = async ({ username, password }) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        // loadUser();
        setIsAuthenticated(true);
        setLoading(false);
        await router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  return (
    <AuthContext.Provider value={{loading, user, error, isAuthenticated, login,}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext