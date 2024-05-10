import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

function AuthContextProvider({
  children,
}: // onLogout,
{
  children: React.ReactNode;
  // onLogout: () => void;
}) {
  const [authToken, setAuthToken] = useState("");

  async function authenticate(token: string) {
    setAuthToken(token);

    await SecureStore.setItemAsync("token", token);
  }

  async function logout() {
    setAuthToken("");

    await SecureStore.deleteItemAsync("token");
  }

  useEffect(() => {
    async function fetchToken() {
      const token = await SecureStore.getItemAsync("token");

      if (token) {
        setAuthToken(token);
      }
    }

    fetchToken();
  }, []);

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
