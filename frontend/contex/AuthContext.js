import {useState, useEffect, createContext} from 'react';
import {useRouter} from 'next/router';
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser()
    }
  }, [user]);

  // Login user
  const login = async ({username, password}) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login/", {
        username,
        password,
      });

      if (res.data.success) {
        loadUser();
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

  // Load user
  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/auth/user/");

      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Logout user
  const logout = async () => {
    try {

      const res = await axios.post("/api/auth/logout/");

      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      );
    }
  };


  // Register user
  const register = async ({firstName, lastName, email, password}) => {
    try {
      setLoading(true);

      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (res.data.message) {
        setLoading(false);
        await router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
        (error.response.data.detail || error.response.data.error)
      );
    }
  };

  //Clear errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{loading, user, error, isAuthenticated, login, logout, register, clearErrors}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext