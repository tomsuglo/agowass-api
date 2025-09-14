import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import Config from "@/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("auth_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading stored user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (studentId, password) => {
    if (!studentId || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    try {
      const res = await fetch(`${Config.API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await res.json();

      if (data.success) {
        await SecureStore.setItemAsync("auth_user", JSON.stringify(data.user));
        // console.log(data.user);
        setUser(data.user);
        router.replace("/student/(tabs)");
        return true;
      } else {
        Alert.alert("Login Failed", data.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to server");
      return false;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("auth_user");
    setUser(null);
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
